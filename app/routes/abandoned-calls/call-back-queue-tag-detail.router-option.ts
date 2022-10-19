import { headers, adminSecureErrors } from '../shared-schema';

const callTagDetailRouterOpts = {
  headers,
  description: 'update call back queue',
  tags: [
    'admin-role',
    'agent-role',
    'abandoned-calls'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'call back queue has been updated',
      type: 'object',
      properties: {
        id: { type: 'string' },
        language: { type: 'string' },
        caller_id: { type: 'string' },
        caller_name: { type: 'string' },
        call_entry_id: { type: 'number' },
        call_reference_number: { type: 'string' }
      }
    },
    404: {
      description: 'no call back queue found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default callTagDetailRouterOpts;
