import { headers, adminSecureErrors } from '../shared-schema';

const createTerminalRouterOpts = {
  headers,
  description: 'create the terminal',
  tags: [
    'terminals',
    'admin-role'
  ],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added terminal',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    },
    ...adminSecureErrors,
  }
};

export default createTerminalRouterOpts;
