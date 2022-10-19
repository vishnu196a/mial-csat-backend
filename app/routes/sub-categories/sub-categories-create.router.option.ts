import { headers, adminSecureErrors } from '../shared-schema';
const createSubCategoryRouterOpts = {
  headers,
  description: 'create sub category',
  tags: [
    'sub-categories',
    'admin-role'
  ],
  params: {
    type: 'object',
    required: ['category_id'],
    properties: {
      category_id: { type: 'number' }
    }
  },
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
  },
  response: {
    headers,
    201: {
      description: 'newly added sub category',
      type: 'object',
      properties: {
        category_id: { type: 'number' },
        category_name: { type: 'string' },
        sub_category_id: { type: 'number' },
        sub_category_name: { type: 'string' },
        sub_category_created_at: { type: 'string' }
      },
    },
    ...adminSecureErrors,
  },
};

export default createSubCategoryRouterOpts;
