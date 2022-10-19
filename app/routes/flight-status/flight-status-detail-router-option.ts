import { headers, adminSecureErrors } from '../shared-schema';

const flightDetailRouterOpts = {
  headers,
  description: 'get flight status detail',
  tags: [
    'flight-status',
    'admin-role',
    'agent-role'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    headers,
    200: {
      description: 'flight status detail',
      type: 'object',
      properties: {
        gate_name: { type: 'string' },
        belt_name: { type: 'string' },
        belt_type: { type: 'string' },
        stand_bay: { type: 'string' },
        created_by: { type: 'string' },
        updated_by: { type: 'string' },
        created_dt: { type: 'string' },
        delay_code: { type: 'string' },
        updated_dt: { type: 'string' },
        flight_type: { type: 'string' },
        code_context: { type: 'string' },
        airline_code: { type: 'string' },
        service_type: { type: 'string' },
        terminal_name: { type: 'string' },
        flight_number: { type: 'string' },
        belt_location: { type: 'string' },
        schedule_type: { type: 'string' },
        boarding_time: { type: 'string' },
        aodb_flight_id: { type: 'number' },
        gate_open_time: { type: 'string' },
        special_action: { type: 'string' },
        delay_duration: { type: 'string' },
        arrival_airport: { type: 'string' },
        gate_close_time: { type: 'string' },
        remark_text_code: { type: 'string' },
        check_in_counter: { type: 'string' },
        remark_free_text: { type: 'string' },
        origin_date_time: { type: 'string' },
        departure_airport: { type: 'string' },
        ten_miles_out_time: { type: 'string' },
        operational_suffix: { type: 'string' },
        operational_status: { type: 'string' },
        flight_schedule_id: { type: 'number' },
        actual_arrival_time: { type: 'string' },
        final_boarding_time: { type: 'string' },
        flight_schedule_type: { type: 'string' },
        actual_take_off_time: { type: 'string' },
        public_terminal_name: { type: 'string' },
        actual_departure_time: { type: 'string' },
        actual_touchdown_time: { type: 'string' },
        scheduled_arrival_time: { type: 'string' },
        estimated_arrival_time: { type: 'string' },
        last_bag_unloaded_time: { type: 'string' },
        first_bag_unloaded_time: { type: 'string' },
        scheduled_departure_time: { type: 'string' },
        estimated_departure_time: { type: 'string' },
        operational_status_description: { type: 'string' }
      }
    },
    ...adminSecureErrors,
  }
};

export default flightDetailRouterOpts;
