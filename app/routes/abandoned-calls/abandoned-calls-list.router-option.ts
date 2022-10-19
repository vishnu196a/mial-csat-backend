import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listAbandonedCallRouterOpts = {
  headers,
  description: 'get the list of abandoned calls',
  tags: [
    'admin-role',
    'agent-role',
    'abandoned-calls'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      to: { type: 'string' },
      from: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' },
      contact_number: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of abandoned calls',
      type: 'object',
      properties: {
        pagination,
        abandoned_calls: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              date_and_time: { type: 'string' },
              contact_number: { type: 'string' },
              call_reference_number: { type: 'string' },
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listAbandonedCallRouterOpts;
