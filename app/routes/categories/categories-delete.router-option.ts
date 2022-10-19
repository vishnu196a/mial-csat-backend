import { headers, adminSecureErrors } from '../shared-schema';

const deleteCategoryRouterOpts = {
  headers,
  description: 'delete category',
  tags: [
    'categories',
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
      description: 'category deleted',
      type: 'object',
      properties: {
        message: { type: 'string' },
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

export default deleteCategoryRouterOpts;
