import { FlightBaggageClaimUnit } from '../../models';
import { FlightStatusListQueryParams } from '../../types';

const orderColumnQuery = (
  query: FlightStatusListQueryParams
) => {
  const orders: any[] = [];
  const {
    o_gate_name: gateName,
    o_belt_name: beltName,
    o_updated_dt: updatedAt,
    o_flight_type: flightType,
    o_flight_name: flightName,
    o_airline_code: airlineCode,
    o_flightstatus: flightStatus,
    o_schedule_type: scheduleType,
    o_flight_number: flightNo,
    o_public_terminal_name: publicTerminalName,
    o_service_type_desc: serviceTypeDesc,
    o_actual_arrival_time: actualArrivalTime,
    o_actual_departure_time: actualDepartureTime,
    o_flight_schedule_id: flightScheduleId,
    o_operational_status: operationalStatus,
    o_arrival_airport_name: arrivalAirportName,
    o_departure_airport_name: departureAirportName,
    o_scheduled_arrival_time: scheduledArrivalTime,
    o_estimated_arrival_time: estimatedArrivalTime,
    o_estimated_departure_time: estimatedDepartureTime,
    o_scheduled_departure_time: scheduledDepartureTime,
    o_operational_status_description: operationalStatusDescription
  } = query;

  if (gateName) {
    orders.push(['gate_name', gateName]);
  }
  if (beltName) {
    orders.push([{
      as: 'flight_baggage_claim_unit',
      model: FlightBaggageClaimUnit
    }, 'baggage_claim_unit', beltName]);
  }
  if (flightType) {
    orders.push(['flight_type', flightType]);
  }
  if (flightName) {
    orders.push(['airline_name', flightName]);
  }
  if (flightStatus) {
    orders.push(['flight_number', flightStatus]);
  }
  if (scheduleType) {
    orders.push(['schedule_type', scheduleType]);
  }
  if (flightNo) {
    orders.push(['flight_number', flightNo]);
  }
  if (updatedAt) {
    orders.push(['updated_dt', updatedAt]);
  }
  if (publicTerminalName) {
    orders.push(['public_terminal_name', publicTerminalName]);
  }
  if (serviceTypeDesc) {
    orders.push(['service_type_desc', serviceTypeDesc]);
  }
  if (flightScheduleId) {
    orders.push(['flight_schedule_id', flightScheduleId]);
  }
  if (airlineCode) {
    orders.push(['airline_code', airlineCode]);
  }
  if (arrivalAirportName) {
    orders.push(['arrival_airport_name', arrivalAirportName]);
  }
  if (departureAirportName) {
    orders.push(['departure_airport_name', departureAirportName]);
  }
  if (operationalStatus) {
    orders.push(['operational_status', operationalStatus]);
  }
  if (actualArrivalTime) {
    orders.push(['actual_arrival_time', actualArrivalTime]);
  }
  if (actualDepartureTime) {
    orders.push(['actual_departure_time', actualDepartureTime]);
  }
  if (estimatedArrivalTime) {
    orders.push(['estimated_arrival_time', estimatedArrivalTime]);
  }
  if (scheduledArrivalTime) {
    orders.push(['scheduled_arrival_time', scheduledArrivalTime]);
  }
  if (estimatedDepartureTime) {
    orders.push(['scheduled_departure_time', estimatedDepartureTime]);
  }
  if (scheduledDepartureTime) {
    orders.push(['estimated_departure_time', scheduledDepartureTime]);
  }
  if (operationalStatusDescription) {
    orders.push(['operational_status_description', operationalStatusDescription]);
  } else {
    orders.push(['scheduled_departure_time', 'DESC']);
  }

  return orders;
};

export default orderColumnQuery;
