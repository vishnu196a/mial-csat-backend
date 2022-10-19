import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listCallBackQueueRouterOpts = {
  headers,
  description: 'get the list of call back queues',
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
      description: 'List of call back queues',
      type: 'object',
      properties: {
        pagination,
        call_back_queues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              date_and_time: { type: 'string' },
              contact_number: { type: 'string' },
              call_reference_number: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listCallBackQueueRouterOpts;
