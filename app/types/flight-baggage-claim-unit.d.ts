import { Model, BuildOptions } from 'sequelize';

export interface FlightBaggageClaimUnitAttributes {
  qualifier: string;
  created_by: string;
  updated_by: string;
  created_dt: Date;
  updated_dt: Date;
  repeat_index: number;
  area_location: string;
  qualifier_desc: string;
  flight_schedule_id: number;
  baggage_claim_unit: string;
  area_location_desc: string;
  flight_baggage_claim_unit_id: number;
}

export type FlightBaggageClaimUnitCreateAttributes = Pick<
FlightBaggageClaimUnitAttributes,
  'flight_schedule_id' |  'baggage_claim_unit'
>

export interface FlightBaggageClaimUnitInstance
  extends Model<FlightBaggageClaimUnitAttributes, FlightBaggageClaimUnitCreateAttributes>,
  FlightBaggageClaimUnitAttributes {}

export type FlightBaggageClaimUnitAttributesStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): FlightBaggageClaimUnitInstance;
};
