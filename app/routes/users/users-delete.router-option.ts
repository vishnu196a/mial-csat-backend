import { headers, adminSecureErrors } from '../shared-schema';

const deleteUserRouterOpts = {
  headers,
  description: 'delete user',
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
      description: 'user deleted',
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

export default deleteUserRouterOpts;
