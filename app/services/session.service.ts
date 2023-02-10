import { getUserById } from './user.service';
import { UserInstance, LoginBodyParams } from '../types';

async function signin(id: number, attrs: LoginBodyParams) {
  const updateUserAttrs = {
    access_token: attrs.access_token,
    sign_in_count: attrs.sign_in_count,
    last_sign_in_at: attrs.last_sign_in_at,
    last_sign_in_ip: attrs.last_sign_in_ip,
    current_sign_in_at: attrs.current_sign_in_at,
    current_sign_in_ip: attrs.current_sign_in_ip,
  };
  const user = await getUserById(id);
  return await user.update(updateUserAttrs);
}

function markLogout(user: UserInstance) {
  return user.update({ access_token: null });
}

export {
  signin,
  markLogout,
};
