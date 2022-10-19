import { headers, adminSecureErrors } from '../shared-schema';

const callTagDataRouterOpts = {
  headers,
  description: 'call tag info',
  tags: ['call-tags', 'admin-role', 'agent-role'],
  params: {
    type: 'object',
    required: ['call_entry_id'],
    properties: {
      call_entry_id: { type: 'number' },
    }
  },
  response: {
    headers,
    200: {
      description: 'call tag info',
      type: 'object',
      properties: {
        language: { type: 'string' },
        caller_id: { type: ['string', 'null'] },
        caller_name: { type: ['string', 'null'] },
        call_entry_id: { type: 'number' },
        already_tagged: { type: 'boolean' },
        call_reference_number: { type: ['string', 'null'] },
        total_calls_attended: { type: 'number' },
        total_abandoned_calls: { type: 'number' },
        total_call_waiting_count: { type: 'number' }
      },
    },
    ...adminSecureErrors,
  },
};

export default callTagDataRouterOpts;
