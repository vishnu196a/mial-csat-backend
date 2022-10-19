import { headers, adminSecureErrors } from '../shared-schema';

const updateExtensionTypeRouterOpts = {
  headers,
  description: 'update extensions types',
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
    200: {
      description: 'extensions types has been updated',
      type: 'object',
      properties: {
        id: { type: 'number' },
        type: { type: 'string' },
        extension: { type: 'string' }
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

export default updateExtensionTypeRouterOpts;
