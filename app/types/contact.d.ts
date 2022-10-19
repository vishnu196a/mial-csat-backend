import { UserInstance } from './user';
import { TerminalInstance } from './terminal';
import { CategoryInstance } from './category';
import { SubCategoryInstance } from './sub-category';

import { Model, BuildOptions, BelongsToGetAssociationMixin } from 'sequelize';

export interface ContactAttributes {
  id: bigint;
  name: string;
  email: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
  created_by: bigint;
  terminal_id: bigint;
  category_id: bigint;
  deleted_at: Date | null;
  landline_number: string | null;
  sub_category_id: bigint;
}

export type ContactCreateAttributes = Pick<
  ContactAttributes,
  'name' | 'email' | 'phone' | 'created_by'
  | 'terminal_id' | 'category_id' | 'sub_category_id'
>;

export interface ContactInstance
  extends Model<ContactAttributes, ContactCreateAttributes>,
  ContactAttributes {
  user: UserInstance;
  terminal: TerminalInstance;
  category: CategoryInstance;
  sub_category: SubCategoryInstance;

  getTerminal: BelongsToGetAssociationMixin<TerminalInstance>;
}
export type ContactStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactInstance;
};
