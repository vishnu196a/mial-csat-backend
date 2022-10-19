import { map, size } from 'lodash';
import { Role, User } from '../models';
import { EmptyResultError } from 'sequelize';
import { sendInvitation } from './mailer.service';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { generateRandomPassword } from '../lib/generate-password';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery } from '../queries/user';

import {
  UserInstance,
  AddUserParams,
  UserUpdateParams,
  UserRowsAndCount,
  UserListQueryParams
} from '../types';

function getUserByEmail(email: string): Promise<UserInstance> {
  return User.findOne({ where: { email } }).then(
    (user: UserInstance | null) => {
      if (user) {
        return user;
      }
      throw new EmptyResultError('User not found');
    }
  );
}

function getAUser(queryAttrs): Promise<UserInstance> {
  return User.findOne({ ...queryAttrs });
}

function getUserById(id: number) {
  return User.findByPk(id)
    .then((user: UserInstance | null) => {
      if (!user) {
        throw new EmptyResultError('User not found');
      }
      return user;
    });
}

function getConfirmedUserByEmail(email: string): Promise<UserInstance> {
  return User.findOne({ where: { email } })
    .then((user: UserInstance | null) => {
      if (user) {
        return user;
      }
      throw new EmptyResultError('User not found');
    });
}

async function add(attrs: AddUserParams) {
  const newPassword = generateRandomPassword();
  const userCreateAttr = {
    ...attrs,
    password: newPassword,
    password_confirmation: newPassword,
    confirmed_at: new Date()
  };

  const newUser = await User.create(userCreateAttr);
  sendInvitation(newUser);
  const userRole = await newUser.getRole();
  const userData = {
    ...newUser.toJSON(),
    role: userRole.name
  };

  return userData;
}

async function detail(id: number) {
  try {
    const user = await getUserById(id);
    const userRole = await user.getRole();
    const userData = {
      ...user.toJSON(),
      role: userRole.name
    };
    return userData;
  } catch (error) {
    throw error;
  }
}

async function update(id: number, attrs: UserUpdateParams) {
  const user = await getUserById(id);
  const updatedUser = await user.update({
    name: attrs.name,
    mobile_no: attrs.mobile_no,
    role_id: attrs.role_id,
    employee_number: attrs.employee_number,
    agent_code: attrs.agent_code,
  });
  const userRole = await updatedUser.getRole();
  const userData = {
    ...updatedUser.toJSON(),
    role: userRole.name
  };
  return userData;
}

async function filterAndPaginate(query: UserListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return User.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['name', 'ASC']],
    include: {
      as: 'role',
      model: Role,
      attributes: ['id', 'name']
    }
  }).then((users: UserRowsAndCount) => {
    const userList = map(users.rows, (row: UserInstance) => {
      const data = {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role.name,
        employee_number: row.employee_number,
        agent_code: row.agent_code,
        mobile_no: row.mobile_no,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
      return data;
    });
    const rowsAndCounts = { count: users.count, rows: userList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'users');
  });
}

async function userDelete(id: number) {
  try {
    const user = await getUserById(id);
    const deletedUser = await user.destroy();
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

async function listAllUsers() {
  return User.findAll({ attributes: ['id', 'name'] });
}

export {
  add,
  update,
  detail,
  getAUser,
  userDelete,
  getUserById,
  listAllUsers,
  getUserByEmail,
  filterAndPaginate,
  getConfirmedUserByEmail
};
