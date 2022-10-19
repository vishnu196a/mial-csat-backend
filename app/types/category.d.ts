import { Model, BuildOptions } from 'sequelize';
import { SubCategoryInstance } from './sub-category';

export interface CategoryAttributes {
  id: bigint;
  name: string;
  created_by: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type CategoryCreationAttributes = Pick<
  CategoryAttributes,
  'name' | 'created_by'
>;

export interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
  CategoryAttributes {
  sub_categories: SubCategoryInstance[];
}

export type CategoryStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): CategoryInstance;
};
