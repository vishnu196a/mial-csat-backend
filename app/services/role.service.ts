import { Role } from '../models';
import { RoleInstance } from '../types';

function listAll(): Promise<RoleInstance> {
  return Role.findAll()
    .then(roles => roles)
    .catch(err => err);
}

export { listAll };
