import { UserInstance } from './user';

import {
  Model,
  BuildOptions,
  BelongsToGetAssociationMixin
} from 'sequelize';

export interface ContentManagementSystemAttributes {
  id: bigint;
  type: string;
  title: string;
  content: string;
  category_id?: bigint;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  sub_category_id?: bigint;
}

export type ContentManagementSystemCreateAttributes = Pick<
  ContentManagementSystemAttributes,
  'type' | 'title' | 'content' | 'created_by'
>;

export interface ContentManagementSystemInstance
  extends Model<ContentManagementSystemAttributes, ContentManagementSystemCreateAttributes>,
  ContentManagementSystemAttributes {
  user: UserInstance;

  getUser: BelongsToGetAssociationMixin<UserInstance>;
}

export type ContentManagementSystemStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContentManagementSystemInstance;
};
