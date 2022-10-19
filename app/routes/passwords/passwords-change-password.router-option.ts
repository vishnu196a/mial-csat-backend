import { headers } from '../shared-schema';

const ChangePasswordRouterOpts = {
  schema: {
    headers,
    description: 'change password',
    tags: [
      'passwords',
      'admin-role',
      'agent-role'
    ],
    body: {
      type: 'object',
      required: ['password', 'password_confirmation'],
      properties: {
        password: { type: 'string' },
        current_password: { type: 'string' },
        password_confirmation: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Password has been changed successfully',
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
      422: {
        description: 'Unprocessable entity',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      500: {
        description: 'Something went wrong',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
};
export default ChangePasswordRouterOpts;
