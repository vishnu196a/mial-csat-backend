import { headers } from '../shared-schema';

const resetPasswordRouterOpts = {
  schema: {
    headers,
    description: 'reset password',
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
        password_confirmation: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Password has been reset successfully',
        type: 'object',
        properties: {
          message: { type: 'string' }
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

export default resetPasswordRouterOpts;
