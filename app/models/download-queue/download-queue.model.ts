import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { DownloadQueueStatic } from '../../types';
import { modelOptions, attributes } from './download-queue.model.attributes';

function DownloadQueueModelFactory(sequelize: Sequelize): DownloadQueueStatic {
  return sequelize.define('DownloadQueue', attributes, modelOptions) as DownloadQueueStatic;
}

const DownloadQueue = DownloadQueueModelFactory(db);

export default DownloadQueue;
