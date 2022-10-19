import { headers, adminSecureErrors } from '../shared-schema';

const liveCallListRouterOpts = {
  headers,
  description: 'get live call',
  tags: [
    'live-call',
    'admin-role',
    'agent-role'
  ],
  response: {
    headers,
    200: {
      description: 'List of live call',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          language: { type: 'string' },
          call_type: { type: 'string' },
          caller_id: { type: 'string' },
          caller_name: { type: 'string' },
          call_tag_id: { type: ['number', 'null'] },
          datetime_init: { type: 'string' },
          call_entry_id: { type: 'number' },
          already_tagged: { type: 'boolean' },
          total_calls_attended: { type: 'number' },
          total_abandoned_calls: { type: 'number' },
          call_reference_number: { type: 'string' },
          total_call_waiting_count: { type: 'number' },
          call_duration_in_minutes: { type: 'string' }
        },
      }
    },
  },
  ...adminSecureErrors,
};

export default liveCallListRouterOpts;
