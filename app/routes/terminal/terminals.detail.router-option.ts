import { headers, adminSecureErrors } from '../shared-schema';

const terminalDetailRouterOpts = {
  headers,
  description: 'terminal detail',
  tags: ['terminals', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    headers,
    200: {
      description: 'get the terminal detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      },
    },
    ...adminSecureErrors,
  },
};

export default terminalDetailRouterOpts;
