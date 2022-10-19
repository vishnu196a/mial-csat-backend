import { Sequelize } from 'sequelize';
import db from '../../config/database';
import { FlightStatusStatic } from '../../types';
import { modelOptions, attributes } from './flight-status.model.attributes';

function FlightStatusModelFactory(sequelize: Sequelize): FlightStatusStatic {
  return sequelize.define('FlightScheduleInfo', attributes, modelOptions) as FlightStatusStatic;
}

const FlightScheduleInfo = FlightStatusModelFactory(db);

export default FlightScheduleInfo;
