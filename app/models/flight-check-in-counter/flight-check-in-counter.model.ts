import db from '../../config/database';
import { Sequelize } from 'sequelize';
import { modelOptions, attributes } from './flight-check-in-counter.model.attributes';
import { FlightCheckInCounterStatic } from '../../types/flight-check-in-counter';

function FlightCheckInCounterModelFactory(sequelize: Sequelize):
FlightCheckInCounterStatic {
  return sequelize.define(
      'FlightCheckInCounter',
      attributes,
      modelOptions
    ) as FlightCheckInCounterStatic;
}

const FlightCheckInCounter = FlightCheckInCounterModelFactory(db);

export default FlightCheckInCounter;
