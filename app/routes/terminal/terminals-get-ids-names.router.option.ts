import { headers, adminSecureErrors } from '../shared-schema';

const getIdsAndNamesTerminalRouterOpts = {
  headers,
  description: 'get the ids and names from the terminals',
  tags: [
    'terminals',
    'admin-role'
  ],
  response: {
    headers,
    200: {
      description: 'ids and names from terminals',
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

export default getIdsAndNamesTerminalRouterOpts;
