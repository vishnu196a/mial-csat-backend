import { headers, adminSecureErrors } from '../shared-schema';

const addUserRouterOpts = {
  headers,
  description: 'sync user',
  tags: [
    'users',
    'admin-role'
  ],
  body: {
    type: 'object',
    required: [
      'name', 'email', 'role_id',
      'agent_code', 'employee_number'
    ],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      role_id: { type: 'number' },
      mobile_no: { type: 'string' },
      password: { type: 'string' },
      agent_code: { type: 'string' },
      confirmed_at: { type: 'string' },
      employee_number: { type: 'string' },
      password_confirmation: { type: 'string' }
    }
  },
  response: {
    headers,
    201: {
      description: 'user create synced successfully',
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    ...adminSecureErrors
  }
};

export default addUserRouterOpts;
