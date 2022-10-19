import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { ContentManagementSystemStatic } from '../../types';

import { modelOptions, attributes } from './content-management-system.model.attributes';

function ContentManagementSystemModelFactory(sequelize: Sequelize): ContentManagementSystemStatic {
  return sequelize.define(
    'ContentManagementSystem', attributes, modelOptions
  ) as ContentManagementSystemStatic;
}

const ContentManagementSystem = ContentManagementSystemModelFactory(db);

export default ContentManagementSystem;
