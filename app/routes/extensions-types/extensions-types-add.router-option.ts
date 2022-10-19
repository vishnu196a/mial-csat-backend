import { headers, adminSecureErrors } from '../shared-schema';

const addExtensionTypeRouterOpts = {
  headers,
  description: 'add extensions types',
  tags: [
    'admin-role',
    'agent-role',
    'extensions-types'
  ],
  body: {
    type: 'object',
    required: ['type', 'extension'],
    properties: {
      type: { type: 'string' },
      extension: { type: 'string' }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added extensions types',
      type: 'object',
      properties: {
        id: { type: 'number' },
        type: { type: 'string' },
        extension: { type: 'string' }
      }
    },
    ...adminSecureErrors
  }
};

export default addExtensionTypeRouterOpts;
