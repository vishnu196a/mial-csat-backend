import { headers, adminSecureErrors } from '../shared-schema';

const getIdsAndNamesSubCategoryRouterOpts = {
  headers,
  description: 'get the ids and names from the sub categories',
  tags: [
    'sub-categories',
    'admin-role',
    'agent-role'
  ],
  params: {
    type: 'object',
    required: ['category_id'],
    properties: {
      category_id: { type: 'number' },
    }
  },
  response: {
    headers,
    200: {
      description: 'ids and names from sub categories',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        },
      },
    },
  },
  ...adminSecureErrors
};
export default getIdsAndNamesSubCategoryRouterOpts;
