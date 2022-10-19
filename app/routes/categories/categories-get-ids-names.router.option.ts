import { headers, adminSecureErrors } from '../shared-schema';

const getIdsAndNamesCategoryRouterOpts = {
  headers,
  description: 'get the ids and names from the  categories',
  tags: [
    'categories',
    'admin-role',
    'agent-role'
  ],
  response: {
    headers,
    200: {
      description: 'ids and names from categories',
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
export default getIdsAndNamesCategoryRouterOpts;
