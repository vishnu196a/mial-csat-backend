import { headers, adminSecureErrors } from '../shared-schema';

const getIdsAndNamesUserRouterOpts = {
  headers,
  description: 'get the ids and names from the  users',
  tags: ['users'],
  response: {
    headers,
    200: {
      description: 'ids and names from users',
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
export default getIdsAndNamesUserRouterOpts;
