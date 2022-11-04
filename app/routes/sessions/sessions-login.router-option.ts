import { headers } from '../shared-schema';

const loginRouterOpts = {
  schema: {
    description: 'post user credentials',
    tags: [
      'sessions',
      'admin-role',
      'agent-role'
    ],
    body: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        sign_in_count: { type: 'number' },
        last_sign_in_at: { type: 'string' },
        last_sign_in_ip: { type: 'string' },
        current_sign_in_at: { type: 'string' },
        current_sign_in_ip: { type: 'string' }
      }
    },
    response: {
      headers,
      200: {
        description: 'Successfully logged in',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      401: {
        description: 'Invalid email or password',
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

export default loginRouterOpts;
