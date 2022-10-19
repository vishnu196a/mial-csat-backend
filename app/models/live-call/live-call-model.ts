import { Sequelize } from 'sequelize';
import db from '../../config/database';
import { LiveCallStatic } from '../../types';
import { modelOptions, attributes } from './live-call.model.attributes';

function LiveCallModelFactory(sequelize: Sequelize): LiveCallStatic {
  return sequelize.define('CurrentCallEntry', attributes, modelOptions) as LiveCallStatic;
}

const LiveCallEntry = LiveCallModelFactory(db);

export default LiveCallEntry;
