import { headers, adminSecureErrors } from '../shared-schema';

const extensionTypeDetailRouterOpts = {
  headers,
  description: 'detail extensions types',
  tags: [
    'admin-role',
    'agent-role',
    'extensions-types'
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
      description: 'get the extensions types detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        type: { type: 'string' },
        extension: { type: 'number' }
      }
    },
    404: {
      description: 'no extensions types found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default extensionTypeDetailRouterOpts;
