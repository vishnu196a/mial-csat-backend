import { FlightScheduleInfo, FlightCheckInCounter } from '..';

function defineScopeAndAssociation() {
  FlightCheckInCounter.belongsTo(FlightScheduleInfo, {
    as: 'flight_schedule_info',
    foreignKey: 'flight_schedule_id'
  });
}

export default defineScopeAndAssociation;
