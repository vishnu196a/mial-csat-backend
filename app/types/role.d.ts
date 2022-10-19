import { UserInstance } from './user';
import {
  Model,
  BuildOptions,
  HasManyGetAssociationsMixin
} from 'sequelize';

export const enum USER_ROLE {
  ADMIN = 'Admin',
  AGENT = 'Agent'
}

export interface RoleAttributes {
  id: bigint;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type RoleCreationAttributes = Pick<
  RoleAttributes, 'name'
>;

export interface RoleInstance
  extends Model<RoleAttributes, RoleCreationAttributes>,
  RoleAttributes {
    getUsers: HasManyGetAssociationsMixin<UserInstance>;
  }

export type RoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RoleInstance;
};
