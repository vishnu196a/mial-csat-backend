import { CategoryInstance, SubCategoryInstance } from './';
import {
  Model,
  BuildOptions,
  BelongsToGetAssociationMixin
} from 'sequelize';

export interface EmailTemplateAttributes {
  id: bigint;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  category_id: bigint;
  sub_category_id: bigint;
}

export type EmailTemplateCreateAttributes = Pick<
EmailTemplateAttributes,
  'name' | 'category_id' | 'sub_category_id'
>;

export interface EmailTemplateInstance
  extends Model<EmailTemplateAttributes, EmailTemplateCreateAttributes>,
  EmailTemplateAttributes {
  category: CategoryInstance;
  subCategory: SubCategoryInstance;

  getCategory: BelongsToGetAssociationMixin<CategoryInstance>;
  getSubCategory: BelongsToGetAssociationMixin<SubCategoryInstance>;
}

export type EmailTemplateStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EmailTemplateInstance;
};
