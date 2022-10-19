import { FlightStatusInstance } from './flight-status';

export interface FlightStatusRowsAndCount {
  count: number;
  rows: FlightStatusInstance[];
}

export interface FlightStatusListQueryParams {
  q: string;
  to?: string;
  page: number;
  from?: string;
  per_page: number;
  gate_name?: string;
  belt_name?: string;
  updated_dt?: string;
  flight_type?: string;
  flight_name?: string;
  airline_code?: string;
  schedule_type?: string;
  flight_number?: string;
  arrival_airport?: string;
  departure_airport?: string;
  operational_status?:string;
  service_type_desc?: string;
  flight_schedule_id?: string;
  public_terminal_name?: string;
  arrival_airport_name: string;
  actual_arrival_time?: string;
  actual_departure_time?: string
  departure_airport_name: string;
  scheduled_arrival_time?: string;
  estimated_arrival_time?: string;
  scheduled_departure_time?: string;
  estimated_departure_time?: string;
  operational_status_description?: string;
  o_gate_name?: string;
  o_belt_name?: string;
  o_updated_dt?: string;
  o_flight_type?: string;
  o_flight_name?: string;
  o_airline_code?: string;
  o_flightstatus?: string;
  o_schedule_type?: string;
  o_flight_number?: string;
  o_service_type_desc?: string;
  o_flight_schedule_id?: string;
  o_operational_status?: string;
  o_actual_arrival_time?: string;
  o_public_terminal_name?: string;
  o_arrival_airport_name?: string;
  o_departure_airport_name?: string;
  o_scheduled_arrival_time?: string;
  o_estimated_arrival_time?: string;
  o_actual_departure_time?: string;
  o_estimated_departure_time?: string;
  o_scheduled_departure_time?: string;
  o_operational_status_description?: string;
}
