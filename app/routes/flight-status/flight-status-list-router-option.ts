import { pagination, headers, adminSecureErrors } from '../shared-schema';

const flightStatusListRouterOpts = {
  headers,
  description: 'get the list of Flight Status',
  tags: [
    'flight-status',
    'admin-role',
    'agent-role'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      to: { type: 'string' },
      page: { type: 'number' },
      from: { type: 'string' },
      per_page: { type: 'number' },
      gate_name: { type: 'string' },
      belt_name: { type: 'string' },
      flight_type: { type: 'string' },
      flight_name: { type: 'string' },
      airline_code: { type: 'string' },
      schedule_type: { type: 'string' },
      flight_number: { type: 'string' },
      operational_status: { type: 'string' },
      service_type_desc: { type: 'string' },
      flight_schedule_id: { type: 'string' },
      actual_arrival_time: { type: 'string' },
      public_terminal_name: { type: 'string' },
      arrival_airport_name: { type: 'string' },
      actual_departure_time: { type: 'string' },
      departure_airport_name: { type: 'string' },
      scheduled_arrival_time: { type: 'string' },
      estimated_arrival_time: { type: 'string' },
      scheduled_departure_time: { type: 'string' },
      estimated_departure_time: { type: 'string' },
      operational_status_description: { type: 'string' },
      o_gate_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_belt_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_updated_dt: { type: 'string', enum: ['ASC', 'DESC'] },
      o_flight_type: { type: 'string', enum: ['ASC', 'DESC'] },
      o_flight_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_airline_code: { type: 'string', enum: ['ASC', 'DESC'] },
      o_flightstatus: { type: 'string', enum: ['ASC', 'DESC'] },
      o_schedule_type: { type: 'string', enum: ['ASC', 'DESC'] },
      o_flight_number: { type: 'string', enum: ['ASC', 'DESC'] },
      o_service_type_desc: { type: 'string', enum: ['ASC', 'DESC'] },
      o_flight_schedule_id: { type: 'string', enum: ['ASC', 'DESC'] },
      o_operational_status: { type: 'string', enum: ['ASC', 'DESC'] },
      o_actual_arrival_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_public_terminal_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_arrival_airport_name: { type: 'string', enum: ['ASC', 'DESC'] },
      O_actual_departure_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_scheduled_arrival_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_estimated_arrival_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_departure_airport_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_estimated_departure_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_scheduled_departure_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_operational_status_description: { type: 'string', enum: ['ASC', 'DESC'] }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of Flight Status',
      type: 'object',
      properties: {
        pagination,
        flight_status: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              gate_name: { type: 'string' },
              belt_name: { type: 'string' },
              created_dt: { type:'string' },
              updated_dt: { type: 'string' },
              flight_type: { type: 'string' },
              flight_name: { type: 'string' },
              airline_code: { type: 'string' },
              schedule_type: { type: 'string' },
              flight_number: { type: 'string' },
              check_in_counter: { type: 'string' },
              service_type_desc: { type: 'string' },
              flight_schedule_id: { type: 'number' },
              operational_status: { type: 'string' },
              actual_arrival_time: { type: 'string' },
              public_terminal_name: { type: 'string' },
              arrival_airport_name: { type: 'string' },
              actual_departure_time: { type: 'string' },
              departure_airport_name: { type: 'string' },
              estimated_arrival_time: { type: 'string' },
              scheduled_arrival_time: { type: 'string' },
              scheduled_departure_time: { type: 'string' },
              estimated_departure_time: { type: 'string' },
              operational_status_description: { type: 'string' }
            }
          }
        }
      }
    }
  },
  ...adminSecureErrors,
};

export default flightStatusListRouterOpts;
