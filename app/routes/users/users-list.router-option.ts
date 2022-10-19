import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listUserRouterOpts = {
  headers,
  description: 'get the list of users',
  tags: [
    'users',
    'admin-role',
    'agent-role'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' },
      name: { type: 'string' },
      email: { type: 'string' },
      mobile_no: { type: 'string' },
      employee_number: { type: 'string' },
      agent_code: { type: 'string' },
    }
  },
  response: {
    headers,
    200: {
      description: 'List of users',
      type: 'object',
      properties: {
        pagination,
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              role: {
                type: 'string',
                enum: ['Admin', 'Agent']
              },
              email: { type: 'string' },
              mobile_no: { type: 'string' },
              employee_number: { type: 'string' },
              agent_code: { type: 'string' },
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

export default listUserRouterOpts;
