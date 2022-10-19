import { headers, adminSecureErrors } from '../shared-schema';

const updateTerminalRouterOpts = {
  headers,
  description: 'update the terminal',
  tags: ['terminals', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    },
  },
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    },
  },
  response: {
    200: {
      headers,
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

export default updateTerminalRouterOpts;
