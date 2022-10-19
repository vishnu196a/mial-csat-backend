import { Model, BuildOptions } from 'sequelize';

export interface FlightCheckInCounterAttributes {
  qualifier: string;
  created_by: string;
  created_dt: Date;
  updated_by: string;
  updated_dt: Date;
  last_position: string;
  first_position: string;
  check_in_class: string;
  check_in_location: string;
  flight_schedule_id: number;
  check_counter_repeat_id: number;
  flight_check_counter_id: number;
}

export type FlightCheckInCounterCreateAttributes = Pick<
FlightCheckInCounterAttributes,
  'qualifier' |  'created_by' | 'updated_by' | 'last_position' |
  'first_position' | 'check_in_class' | 'check_in_location' |
  'flight_schedule_id' | 'check_counter_repeat_id'
>;

export interface FlightCheckInCounterInstance
  extends Model<FlightCheckInCounterAttributes, FlightCheckInCounterCreateAttributes>,
  FlightCheckInCounterAttributes {}

export type FlightCheckInCounterStatic = typeof Model & { // tslint:disable-line
  new(values?: object, options?: BuildOptions): FlightCheckInCounterInstance // tslint:disable-line
}; // tslint:disable-line
