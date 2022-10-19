import moment from 'moment';
import { map, size, concat } from 'lodash';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { FlightStatusInstance } from '../types';
import { EmptyResultError } from 'sequelize';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery, orderColumnQuery } from '../queries/flight-status';

import {
  FlightStatusListQueryParams,
  FlightStatusRowsAndCount
} from '../types/flight-status.controller';
import {
  FlightScheduleInfo,
  FlightCheckInCounter,
  FlightBaggageClaimUnit
} from '../models';

function frameCheckInCounter(flightStatus: FlightStatusInstance): string {
  const { flight_check_in_counter: checkInCounter } = flightStatus;

  if (checkInCounter) {
    const {
      last_position: lastPosition,
      first_position: firstPosition
    } = checkInCounter;

    if (!firstPosition && lastPosition) return `${lastPosition}`;
    if (firstPosition && !lastPosition) return `${firstPosition}`;
    if (firstPosition && lastPosition) return `${firstPosition}, ${lastPosition}`;
  }
  return '';
}

async function filterAndPaginate(query: FlightStatusListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  const orders = orderColumnQuery(query);

  const flightStatus = await FlightScheduleInfo.findAndCountAll({
    limit,
    offset,
    where: {
      ...queries,
      ...columnQuery
    },
    include: [
      {
        as: 'flight_baggage_claim_unit',
        model: FlightBaggageClaimUnit,
        attributes: ['baggage_claim_unit']
      },
      {
        as: 'flight_check_in_counter',
        model: FlightCheckInCounter,
        attributes: ['first_position', 'last_position']
      }
    ],
    order: orders,
    attributes: [
      'gate_name',
      'created_dt',
      'updated_dt',
      'flight_type',
      'airline_code',
      'airline_name',
      'flight_number',
      'schedule_type',
      'service_type_desc',
      'flight_schedule_id',
      'operational_status',
      'actual_arrival_time',
      'public_terminal_name',
      'arrival_airport_name',
      'actual_departure_time',
      'departure_airport_name',
      'estimated_arrival_time',
      'scheduled_arrival_time',
      'scheduled_departure_time',
      'estimated_departure_time',
      'operational_status_description'
    ]
  });
  const flightStatusList = map(flightStatus.rows, (row: FlightStatusInstance) => {
    const checkInCounter = frameCheckInCounter(row);
    return {
      gate_name: row.gate_name,
      belt_name: row.flight_baggage_claim_unit ? row.flight_baggage_claim_unit['baggage_claim_unit'] : '', // tslint:disable-line
      created_dt: row.created_dt,
      updated_dt: row.updated_dt,
      flight_type: row.flight_type,
      flight_name: row.airline_name,
      airline_code: row.airline_code,
      schedule_type: row.schedule_type,
      flight_number: row.flight_number,
      check_in_counter: checkInCounter,
      service_type_desc: row.service_type_desc,
      flight_schedule_id: row.flight_schedule_id,
      operational_status: row.operational_status,
      actual_arrival_time: row.actual_arrival_time,
      public_terminal_name: row.public_terminal_name,
      arrival_airport_name: row.arrival_airport_name,
      actual_departure_time: row.actual_departure_time,
      departure_airport_name: row.departure_airport_name,
      estimated_arrival_time: row.estimated_arrival_time,
      scheduled_arrival_time: row.scheduled_arrival_time,
      scheduled_departure_time: row.scheduled_departure_time,
      estimated_departure_time: row.estimated_departure_time,
      operational_status_description: row.operational_status_description
    };
  });

  const rowsAndCounts = { count: flightStatus.count, rows: flightStatusList };
  const result = paginate(rowsAndCounts, perPage, page);
  return paginatorResult(result, 'flight_status');
}

async function getFlightStatusById(id: number) {
  const flightStatus = await FlightScheduleInfo.findOne({
    where: { flight_schedule_id: id },
    include: [
      {
        as: 'flight_baggage_claim_unit',
        model: FlightBaggageClaimUnit,
        attributes: ['baggage_claim_unit', 'qualifier_desc', 'area_location_desc']
      },
      {
        as: 'flight_check_in_counter',
        model: FlightCheckInCounter,
        attributes: ['first_position', 'last_position']
      }
    ]
  });
  if (!flightStatus) throw new EmptyResultError('Flight Status not found');

  return {
    ...flightStatus.toJSON(),
    belt_name: flightStatus.flight_baggage_claim_unit ? flightStatus.flight_baggage_claim_unit['baggage_claim_unit'] : '', // tslint:disable-line
    belt_type: flightStatus.flight_baggage_claim_unit ? flightStatus.flight_baggage_claim_unit['qualifier_desc'] : '', // tslint:disable-line
    belt_location: flightStatus.flight_baggage_claim_unit ? flightStatus.flight_baggage_claim_unit['area_location_desc'] : '', // tslint:disable-line
    check_in_counter: frameCheckInCounter(flightStatus)
  };
}

export { getFlightStatusById, filterAndPaginate };
