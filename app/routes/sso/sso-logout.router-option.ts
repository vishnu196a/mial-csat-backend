import { headers } from '../shared-schema';

const ssoLogoutRouterOpts = {
  schema: {
    headers,
    description: 'Logout SSO',
    tags: [
      'ivr',
      'sso',
      'admin-role',
      'agent-role'
    ],
    body: {
      type: 'object',
      required: ['agent_code'],
      properties: {
        agent_code: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'SSO successfully logged out',
        type: 'object',
        properties: {
          message: { type: 'string' }
        },
      },
      401: {
        description: 'Invalid SSO credentials',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      },
      404: {
        description: 'not found',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } },
        },
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

export default ssoLogoutRouterOpts;
