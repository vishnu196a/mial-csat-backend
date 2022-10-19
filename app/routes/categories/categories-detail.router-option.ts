import { headers, adminSecureErrors } from '../shared-schema';

const detailCategoryRouterOpts = {
  headers,
  description: 'get category detail',
  tags: [
    'categories',
    'admin-role',
    'agent-role'
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
      description: 'category detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        created_by: { type: 'number' },
        sub_categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              created_by: { type: 'number' },
              category_id: { type: 'number' },
            },
          },
        },
      },
    },
    404: {
      description: 'no category found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } },
      },
    },
    ...adminSecureErrors,
  },
};

export default detailCategoryRouterOpts;
