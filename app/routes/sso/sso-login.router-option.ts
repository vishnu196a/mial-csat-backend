import { headers, signInUserProfile } from '../shared-schema';

const ssoLoginRouterOpts = {
  schema: {
    headers,
    description: 'Login SSO',
    tags: [
      'ivr',
      'sso',
      'admin-role',
      'agent-role'
    ],
    response: {
      headers,
      200: {
        description: 'Successfully logged in',
        type: 'object',
        properties: signInUserProfile
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

export default ssoLoginRouterOpts;
