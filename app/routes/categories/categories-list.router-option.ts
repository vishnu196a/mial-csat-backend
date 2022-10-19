import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listCategoryRouterOpts = {
  headers,
  description: 'get the list of categories',
  tags: [
    'categories',
    'admin-role',
    'agent-role'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' },
    },
  },
  response: {
    headers,
    200: {
      description: 'List of categories',
      type: 'object',
      properties: {
        pagination,
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
            },
          },
        },
      },
    },
  },
  ...adminSecureErrors,
};

export default listCategoryRouterOpts;
