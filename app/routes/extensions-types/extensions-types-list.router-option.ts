import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listExtensionTypeRouterOpts = {
  headers,
  description: 'get the list of extensions types',
  tags: [
    'admin-role',
    'agent-role',
    'extensions-types'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      type: { type: 'string' },
      per_page: { type: 'number' },
      extension: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of extensions types',
      type: 'object',
      properties: {
        pagination,
        extensions_types: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              type: { type: 'string' },
              extension: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listExtensionTypeRouterOpts;
