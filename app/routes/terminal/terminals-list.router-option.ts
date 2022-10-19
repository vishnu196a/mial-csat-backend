import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listTerminalRouterOpts = {
  headers,
  description: 'get the list of terminals',
  tags: [
    'terminals',
    'admin-role'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      name: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of terminals',
      type: 'object',
      properties: {
        pagination,
        terminals: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listTerminalRouterOpts;
