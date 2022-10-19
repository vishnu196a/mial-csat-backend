import bcrypt from 'bcrypt';

import { SessionError } from '../exceptions';
import { getConfirmedUserByEmail } from './user.service';
import { UserInstance, LoginServiceParams } from '../types';
import { sign as jwtSignin, verify as jwtVerify } from 'jsonwebtoken';

function validatePassword(currentUser: UserInstance, password: string) {
  const isPasswordMatched = bcrypt.compareSync(
    password,
    currentUser.encrypted_password
  );
  if (!isPasswordMatched) {
    throw new SessionError('Invalid email or password');
  }
}

async function markSignin(user: UserInstance, attrs: LoginServiceParams) {
  const currentDate = new Date();
  const { id, email } = user;
  const { JWT_SECRET_KEY } = process.env;
  const token = jwtSignin({ id, email }, JWT_SECRET_KEY);
  const updateAttributes = {
    access_token: token,
    current_sign_in_at: currentDate,
    current_sign_in_ip: attrs.ipaddress,
    sign_in_count: user.sign_in_count + 1,
    last_sign_in_at: user.current_sign_in_at,
    last_sign_in_ip: user.current_sign_in_ip,
  };
  const updatedUser = await user.update(updateAttributes);
  const result = {
    ...updatedUser.toJSON(),
    role: await (await updatedUser.getRole()).name,
  };
  return result;
}

async function signin(attrs: LoginServiceParams) {
  let currentUser: UserInstance;
  try {
    currentUser = await getConfirmedUserByEmail(attrs.email);
  } catch (error) {
    throw new SessionError('Invalid email or password');
  }
  validatePassword(currentUser, attrs.password);
  return await markSignin(currentUser, attrs);
}

function markLogout(user: UserInstance) {
  return user.update({ access_token: null });
}

function decryptUserAttrsFromInvitationToken(
  invitationToken: string,
  type: string
) {
  const token = invitationToken.split(' ')[1];
  if (!token) {
    throw new SessionError('No access token found');
  }
  const { JWT_SECRET_KEY = '' } = process.env;
  const userAttrs = jwtVerify(token, JWT_SECRET_KEY);
  if (!userAttrs || type !== userAttrs.type) {
    throw new SessionError('Invalid access token');
  }
  return userAttrs;
}

function validateChangePassword(currentUser: UserInstance, password: string) {
  const isPasswordSame = bcrypt.compareSync(
    password,
    currentUser.encrypted_password
  );

  if (!isPasswordSame) {
    throw new Error('Invalid current password');
  }
}

export {
  signin,
  markLogout,
  markSignin,
  validateChangePassword,
  decryptUserAttrsFromInvitationToken
};
