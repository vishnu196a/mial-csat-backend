import { FlightScheduleInfo, FlightBaggageClaimUnit } from '..';

function defineScopeAndAssociation() {
  FlightBaggageClaimUnit.belongsTo(FlightScheduleInfo, {
    as: 'flight_schedule_info',
    foreignKey: 'flight_schedule_id'
  });
}

export default defineScopeAndAssociation;
