import { Sequelize } from 'sequelize';
import db from '../../config/database';
import { CategoryStatic } from '../../types';
import { modelOptions, attributes } from './category.model.attributes';

function CategoryModelFactory(sequelize: Sequelize): CategoryStatic {
  return sequelize.define('Category', attributes, modelOptions) as CategoryStatic;
}

const Category = CategoryModelFactory(db);

export default Category;
