import { headers, adminSecureErrors } from '../shared-schema';

const addUserRouterOpts = {
  headers,
  description: 'add user',
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
      employee_number: { type: 'string' },
      agent_code: { type: 'string' }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added user',
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
    },
    ...adminSecureErrors
  }
};

export default addUserRouterOpts;
