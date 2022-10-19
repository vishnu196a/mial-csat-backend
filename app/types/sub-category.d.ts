import { CategoryInstance } from './category';
import { Model, BuildOptions, BelongsToGetAssociationMixin } from 'sequelize';

export interface SubCategoryAttributes {
  id: bigint;
  name: string;
  category_id: string;
  created_by: bigint;
  updated_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type SubCategoryCreationAttributes = Pick<
  SubCategoryAttributes,
  'name' | 'created_by'
>;

export interface SubCategoryInstance
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>,
    SubCategoryAttributes {
  getCategory: BelongsToGetAssociationMixin<CategoryInstance>;
}

export type SubCategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SubCategoryInstance;
};
