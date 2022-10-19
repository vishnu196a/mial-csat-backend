import { headers, adminSecureErrors } from '../shared-schema';

const deleteSubCategoryRouterOpts = {
  headers,
  description: 'delete sub category',
  tags: [
    'sub-categories',
    'admin-role'
  ],
  params: {
    type: 'object',
    required: ['id', 'category_id'],
    properties: {
      id: { type: 'number' },
      category_id: { type: 'number' }
    },
  },
  response: {
    headers,
    200: {
      description: 'sub category deleted',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'no subCategory found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } },
      },
    },
    ...adminSecureErrors,
  },
};

export default deleteSubCategoryRouterOpts;
