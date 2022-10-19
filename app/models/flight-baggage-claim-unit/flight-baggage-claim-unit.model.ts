import db from '../../config/database';
import { Sequelize } from 'sequelize';
import { modelOptions, attributes } from './flight-baggage-claim-unit.model.attributes';
import { FlightBaggageClaimUnitAttributesStatic } from '../../types/flight-baggage-claim-unit';

function FlightBaggageClaimUnitModelFactory(sequelize: Sequelize):
  FlightBaggageClaimUnitAttributesStatic {
  return sequelize.define(
      'FlightBaggageClaimUnit',
      attributes,
      modelOptions
    ) as FlightBaggageClaimUnitAttributesStatic;
}

const FlightBaggageClaimUnit = FlightBaggageClaimUnitModelFactory(db);

export default FlightBaggageClaimUnit;
