import { headers, adminSecureErrors } from '../shared-schema';

const deleteTerminalRouterOpts = {
  headers,
  description: 'delete terminal',
  tags: [
    'terminals',
    'admin-role'
  ],
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
      description: 'terminal deleted',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'no terminal found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } },
      },
    },
    ...adminSecureErrors,
  },
};

export default deleteTerminalRouterOpts;
