import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { CallEntryStatic } from '../../types';

import { attributes, modelOptions } from './call-entry.model.attributes';

function CallEntryModelFactory(sequelize: Sequelize): CallEntryStatic {
  return sequelize.define('CallEntry', attributes, modelOptions) as CallEntryStatic;
}

const CallEntry = CallEntryModelFactory(db);

export default CallEntry;
