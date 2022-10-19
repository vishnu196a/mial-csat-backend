import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { SubCategoryStatic } from '../../types/sub-category';
import { modelOptions, attributes } from './sub-category.model.attributes';

function SubCategoryModelFactory(sequelize: Sequelize): SubCategoryStatic {
  return sequelize.define('SubCategory', attributes, modelOptions) as SubCategoryStatic;
}

const SubCategory = SubCategoryModelFactory(db);

export default SubCategory;
