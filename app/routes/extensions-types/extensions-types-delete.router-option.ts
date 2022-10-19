import { headers, adminSecureErrors } from '../shared-schema';

const deleteExtensionTypeRouterOpts = {
  headers,
  description: 'delete extension type',
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
      description: 'extension type deleted',
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    404: {
      description: 'no extension type found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default deleteExtensionTypeRouterOpts;
