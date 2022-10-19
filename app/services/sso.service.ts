import { UserInstance } from '../types';
import { SessionError } from '../exceptions';
import { EmptyResultError } from 'sequelize';

import { getAnAent } from './agent.service';
import { getAUser, getConfirmedUserByEmail } from './user.service';
import { sign as jwtSignin, verify as jwtVerify } from 'jsonwebtoken';

const {
  JWT_SECRET_KEY = '',
  SSO_AUTHORIZE_URL = '',
  JWT_SECRET_KEY_FOR_TEMP_SSO_TOKEN = '',
  JWT_TOKEN_DURATION_FOR_TEMP_SSO_TOKEN = ''
} = process.env;

function generateSSOToken(id, email): string {
  const token = jwtSignin({ id, email },
    JWT_SECRET_KEY_FOR_TEMP_SSO_TOKEN, // tslint:disable-line
    { expiresIn: JWT_TOKEN_DURATION_FOR_TEMP_SSO_TOKEN } // tslint:disable-line
  );
  return token;
}

async function validateAndGetSSOUrl(agentCode: string): Promise<object> {
  const agent = await getAnAent({ where: { number: agentCode } });
  if (!agent) throw new EmptyResultError('Agent not found');

  const user = await getAUser({ where: { agent_code: agent.number } });
  if (!user) throw new EmptyResultError('User not found');

  const token = generateSSOToken(user.id, user.email);
  const ssoUrl = `${SSO_AUTHORIZE_URL}?token=${token}`;
  return { sso_login_url: ssoUrl };
}

function decryptUserAttrsFromIvrLoginToken(
  ivrLogintoken: string,
) {
  const token = ivrLogintoken.split(' ')[1];
  if (!token) {
    throw new SessionError('No access token found');
  }
  const userAttrs = jwtVerify(token, JWT_SECRET_KEY_FOR_TEMP_SSO_TOKEN);
  if (!userAttrs) {
    throw new SessionError('Invalid access token');
  }
  return userAttrs;
}

async function validateAndMarkLogin(token: string, ipaddress: string) {
  try {
    const currentDate = new Date();
    const userAttrs = decryptUserAttrsFromIvrLoginToken(
      token
    );
    const currentUser = await getConfirmedUserByEmail(userAttrs.email);
    const { id, email } = currentUser;
    const loginToken = jwtSignin({ id, email }, JWT_SECRET_KEY);

    const updateAttributes = {
      access_token: loginToken,
      current_sign_in_at: currentDate,
      current_sign_in_ip: ipaddress,
      sign_in_count: currentUser.sign_in_count + 1,
      last_sign_in_at: currentUser.current_sign_in_at,
      last_sign_in_ip: currentUser.current_sign_in_ip,
    };
    const updatedUser = await currentUser.update(updateAttributes);

    const result = {
      ...updatedUser.toJSON(),
      role: await (await updatedUser.getRole()).name,
    };
    return result;
  } catch (error) {
    throw error;
  }
}

async function markSSOLogout(agentCode: string): Promise<UserInstance> {
  const agent = await getAnAent({ where: { number: agentCode } });
  if (!agent) throw new EmptyResultError('Agent not found');

  const user = await getAUser({ where: { agent_code: agent.number } });
  if (!user) throw new EmptyResultError('User not found');

  return user.update({ access_token: null });
}

export {
  markSSOLogout,
  validateAndGetSSOUrl,
  validateAndMarkLogin
};
