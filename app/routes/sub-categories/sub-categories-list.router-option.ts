import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listSubCategoryrouterOpts = {
  headers,
  description: 'get the list of sub categories',
  tags: [
    'sub-categories',
    'admin-role',
    'agent-role'
  ],
  params: {
    type: 'object',
    required: ['category_id'],
    properties: {
      category_id: { type: 'number' }
    }
  },
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
      description: 'List of sub categories',
      type: 'object',
      properties: {
        pagination,
        sub_categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
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

export default listSubCategoryrouterOpts;
