import {
  FlightScheduleInfo,
  FlightCheckInCounter,
  FlightBaggageClaimUnit,
} from '..';

function defineScopeAndAssociation() {
  FlightScheduleInfo.hasOne(FlightBaggageClaimUnit, {
    as: 'flight_baggage_claim_unit',
    foreignKey: 'flight_schedule_id'
  });
  FlightScheduleInfo.hasOne(FlightCheckInCounter, {
    as: 'flight_check_in_counter',
    foreignKey: 'flight_schedule_id'
  });
}

export default defineScopeAndAssociation;
