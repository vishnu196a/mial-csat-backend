import { headers, adminSecureErrors } from '../shared-schema';

const listRoleRouterOpts = {
  schema: {
    headers,
    description: 'get the list of roles',
    tags: [
      'roles',
      'admin-role',
      'agent-role'
    ],
    response: {
      headers,
      200: {
        description: 'List of roles',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' }
          }
        }
      },
      ...adminSecureErrors
    }
  }
};

export default listRoleRouterOpts;
