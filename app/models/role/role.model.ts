import { Sequelize } from 'sequelize';

import db from '../../config/database';
import { RoleStatic } from '../../types';
import { modelOptions, attributes } from './role.model.attributes';

function RoleModelFactory(sequelize: Sequelize): RoleStatic {
  return sequelize.define(
    'Role',
    attributes,
    modelOptions
  ) as RoleStatic;
}

const Role = RoleModelFactory(db);

export default Role;
