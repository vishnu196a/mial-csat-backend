import { User } from '../models';
import { EmptyResultError } from 'sequelize';

import {
  UserInstance,
  AddUserParams,
  UserUpdateParams,
} from '../types';

async function getUserByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new EmptyResultError('User not found');
  return user;
}

async function getAUser(queryAttrs) {
  return await User.findOne({ ...queryAttrs });
}

async function getUserById(id: number) {
  const user = await User.findByPk(id);
  if (!user) throw new EmptyResultError('User not found');
  return user;
}

async function getConfirmedUserByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new EmptyResultError('User not found');
  return user;
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
  return {
    ...updatedUser.toJSON(),
    role: userRole.name
  };
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
