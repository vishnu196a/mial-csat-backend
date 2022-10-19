import { Sequelize } from 'sequelize';
import db from '../../config/database';
import { CallTagStatic } from '../../types';
import { modelOptions, attributes } from './call-tag.model.attributes';

function CallTagModelFactory(sequelize: Sequelize): CallTagStatic {
  return sequelize.define('CallTag', attributes, modelOptions) as CallTagStatic;
}

const CallTag = CallTagModelFactory(db);

export default CallTag;
