import { RoleInstance } from './role';
import {
  Model,
  BuildOptions,
  BelongsToGetAssociationMixin
} from 'sequelize';

export interface UserAttributes {
  id: bigint;
  name: string;
  email: string;
  mobile_no?: string;
  employee_number: string;
  agent_code: string;
  password?: string;
  password_confirmation?: string;
  encrypted_password: string;
  access_token: string | null;
  invited_by: bigint | null;
  role_id: bigint | null;
  sign_in_count: number;
  last_sign_in_ip: string;
  last_sign_in_at: Date | null;
  current_sign_in_ip: string;
  current_sign_in_at: Date | null;
  confirmed_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type UserCreateAttributes = Pick<
  UserAttributes,
  'name' | 'email' | 'invited_by' | 'mobile_no' |
  'employee_number' | 'agent_code'
>;

export interface UserInstance
  extends Model<UserAttributes, UserCreateAttributes>,
  UserAttributes {
  role: RoleInstance;

  isAdmin(): Boolean,
  isAgent(): Boolean

  getRole: BelongsToGetAssociationMixin<RoleInstance>;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};
