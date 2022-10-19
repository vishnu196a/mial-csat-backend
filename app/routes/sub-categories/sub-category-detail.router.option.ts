import { headers, adminSecureErrors } from '../shared-schema';
const SubCategoryDetailRouterOpts = {
  headers,
  description: 'sub category detail',
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
      description: 'sub category detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }

      },
    },
    ...adminSecureErrors,
  },
};

export default SubCategoryDetailRouterOpts;
