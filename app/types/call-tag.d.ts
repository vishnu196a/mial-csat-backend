import { RoleInstance } from './role';
import { UserInstance } from './user';
import { CategoryInstance } from './category';
import { CallEntryInstance } from './call-entry';
import { SubCategoryInstance } from './sub-category';

import { Model, BuildOptions, BelongsToGetAssociationMixin } from 'sequelize';

export interface CallTagAttributes {
  id: number;
  mode: string;
  answer: string;
  question: string;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  terminal_id?: bigint;
  caller_name?: string;
  category_id: bigint;
  call_entry_id: number;
  contact_number: string;
  sub_category_id: bigint;
  caller_email_id?: string;
}

export type CallTagCreateAttributes = Pick<
  CallTagAttributes,
  'mode'
  | 'answer'
  | 'question'
  | 'created_by'
  | 'caller_name'
  | 'terminal_id'
  | 'category_id'
  | 'call_entry_id'
  | 'contact_number'
  | 'sub_category_id'
  | 'caller_email_id'
  | 'contact_number'
>;

export interface CallTagInstance
  extends Model<CallTagAttributes, CallTagCreateAttributes>,
  CallTagAttributes {
  user: UserInstance;
  role: RoleInstance;
  category: CategoryInstance;
  call_entry: CallEntryInstance;
  sub_category: SubCategoryInstance;
  getCallEntry: BelongsToGetAssociationMixin<CallEntryInstance>;
}

export type CallTagStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): CallTagInstance;
};
