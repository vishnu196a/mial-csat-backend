import db from '../../config/database';
import { Sequelize } from 'sequelize';
import { EmergencyEmailStatic } from '../../types';
import { modelOptions, attributes } from './emergency-email.model.attributes';

function EmergencyEmailModelFactory(sequelize: Sequelize): EmergencyEmailStatic {
  return sequelize.define('EmergencyEmail', attributes, modelOptions) as EmergencyEmailStatic;
}

const EmergencyEmail = EmergencyEmailModelFactory(db);

export default EmergencyEmail;
