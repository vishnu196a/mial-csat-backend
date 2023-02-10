import { headers, adminSecureErrors } from '../shared-schema';

const updateUserRouterOpts = {
  headers,
  description: 'update user',
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
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      mobile_no: { type: 'string' },
      role_id: { type: 'number' },
      employee_number: { type: 'string' },
      agent_code: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'user update sync successfully',
      type: 'object',
      properties: {
        message: { type: 'string' }
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

export default updateUserRouterOpts;
