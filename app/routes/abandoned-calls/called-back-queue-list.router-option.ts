import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listCalledBackQueueRouterOpts = {
  headers,
  description: 'get the list of called back queues',
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
      contact_number: { type: 'string' },
      type_of_called_back_queue: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of called back queues',
      type: 'object',
      properties: {
        pagination,
        called_back_queues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              reason: { type: 'string' },
              date_and_time: { type: 'string' },
              contact_number: { type: 'string' },
              call_reference_number: { type: 'string' },
              type_of_called_back_queue: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listCalledBackQueueRouterOpts;
