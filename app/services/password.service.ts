import { TOKEN_TYPE } from '../config/constants';
import { getUserByEmail } from './user.service';
import { sign as jwtSignin } from 'jsonwebtoken';
import { sendResetPasswordLink } from './mailer.service';

import {
  validateChangePassword,
  decryptUserAttrsFromInvitationToken
} from './session.service';

import {
  ResetPasswordParams,
  ChangePasswordParams
} from '../types';

async function sendResetPasswordInstruction(email: string) {
  const user = await getUserByEmail(email);
  const {
    JWT_SECRET_KEY = '',
    RESET_PASSWORD_LINK_EXPIRES_IN = '1h'
  } = process.env;
  const { id, name } = user;

  const token = jwtSignin(
    {
      id,
      name,
      email,
      time: new Date(),
      type: TOKEN_TYPE.resetPassword
    },
    JWT_SECRET_KEY,
    { expiresIn: RESET_PASSWORD_LINK_EXPIRES_IN }
  );

  sendResetPasswordLink(user, token);
}

async function verifyAndResetPassword(
  resetToken: string,
  passwordParams: ResetPasswordParams
  ) {
  const userAttrs = decryptUserAttrsFromInvitationToken(
    resetToken,
    TOKEN_TYPE.resetPassword
  );
  const user = await getUserByEmail(userAttrs.email);
  const updateAttrs = {
    ...passwordParams,
    access_token: null
  };
  return await user.update(updateAttrs);
}

async function verifyAndChangePassword(
  currentUser,
  passwordParams: ChangePasswordParams
) {
  validateChangePassword(currentUser, passwordParams.current_password);
  const user = await getUserByEmail(currentUser.email);
  const updateAttrs = {
    ...passwordParams,
    access_token: null
  };
  const updatedUser =  await user.update(updateAttrs);
  const userRole = await updatedUser.getRole();
  const userData = {
    ...updatedUser.toJSON(),
    role: userRole.name
  };
  return userData;
}

export {
    verifyAndResetPassword,
    verifyAndChangePassword,
    sendResetPasswordInstruction
  };
