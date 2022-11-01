import { User } from '../models';
import { EmptyResultError } from 'sequelize';

import {
  UserInstance,
  AddUserParams,
  UserUpdateParams,
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
  const user = await User.create(attrs);
  return user;
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

async function userDelete(id: number) {
  try {
    const user = await getUserById(id);
    const deletedUser = await user.destroy();
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

export {
  add,
  update,
  getAUser,
  userDelete,
  getUserById,
  getUserByEmail,
  getConfirmedUserByEmail
};
