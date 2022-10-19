import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { ExtensionTypeStatic } from '../../types';
import { modelOptions, attributes } from './extension-type.model.attributes';

function ExtensionTypeModelFactory(sequelize: Sequelize): ExtensionTypeStatic {
  return sequelize.define('ExtensionType', attributes, modelOptions) as ExtensionTypeStatic;
}

const ExtensionType = ExtensionTypeModelFactory(db);

export default ExtensionType;
