import { headers, adminSecureErrors } from '../shared-schema';

const userDetailRouterOpts = {
  headers,
  description: 'detail user',
  tags: [
    'users',
    'admin-role'
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
      description: 'get the user detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        role_id: { type: 'number' },
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
    },
    404: {
      description: 'no user found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default userDetailRouterOpts;
