import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { QueueCallEntryStatic } from '../../types';
import { modelOptions, attributes } from './queue-call-entry.model.attributes';

function QueueCallEntryModelFactory(sequelize: Sequelize): QueueCallEntryStatic {
  return sequelize.define('QueueCallEntry', attributes, modelOptions) as QueueCallEntryStatic;
}

const QueueCallEntry = QueueCallEntryModelFactory(db);

export default QueueCallEntry;
