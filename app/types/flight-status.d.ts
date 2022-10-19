import { Model, BuildOptions } from 'sequelize';
import {
  FlightCheckInCounterInstance,
  FlightBaggageClaimUnitInstance
} from './';

export interface FlightStatusAttributes {
  stand_bay: string;
  gate_name: string;
  created_by: string;
  updated_by: string;
  created_dt: Date;
  delay_code: string;
  updated_dt: Date;
  flight_type: string;
  code_context: string;
  airline_code: string;
  service_type: string;
  airline_name: string;
  terminal_name: string;
  flight_number: string;
  schedule_type: string;
  aodb_flight_id: number;
  special_action: string;
  delay_duration: string;
  arrival_airport: string;
  remark_text_code: string;
  remark_free_text: string;
  origin_date_time: Date;
  service_type_desc: string;
  departure_airport: string;
  operational_suffix: string;
  operational_status: string;
  flight_schedule_id: number;
  actual_arrival_time: Date;
  flight_schedule_type: string;
  public_terminal_name: string;
  arrival_airport_name: string;
  actual_departure_time: Date;
  scheduled_arrival_time: Date;
  estimated_arrival_time: Date;
  departure_airport_name: string;
  scheduled_departure_time: Date;
  estimated_departure_time: Date;
  operational_status_description: string;
}

export type FlightStatusCreateAttributes = Pick<
  FlightStatusAttributes,
  'flight_schedule_id' |  'aodb_flight_id' | 'airline_code' |'flight_number'
>

export interface FlightStatusInstance
  extends Model<FlightStatusAttributes, FlightStatusCreateAttributes>,
  FlightStatusAttributes {
    flight_check_in_counter: FlightCheckInCounterInstance;
    flight_baggage_claim_unit: FlightBaggageClaimUnitInstance;
  }

export type FlightStatusStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): FlightStatusInstance;
};
