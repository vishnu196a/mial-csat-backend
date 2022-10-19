import { headers, adminSecureErrors } from '../shared-schema';
const updateSubCategoryRouterOpts = {
  headers,
  description: 'update sub category',
  tags: [
    'sub-categories',
    'admin-role'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
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
    200: {
      description: 'newly updated sub category',
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

export default updateSubCategoryRouterOpts;
