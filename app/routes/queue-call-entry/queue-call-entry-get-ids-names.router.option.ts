import { headers, adminSecureErrors } from '../shared-schema';

const getIdsAndNamesQueueCallEntryRouterOpts = {
  headers,
  description: 'get the ids and names from the queue call entry',
  tags: ['admin-role', 'agent-role', 'queue-call-entry'],
  response: {
    headers,
    200: {
      description: 'ids and names from queue call entry',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          description: { type: 'string' }
        }
      }
    }
  },
  ...adminSecureErrors
};
export default getIdsAndNamesQueueCallEntryRouterOpts;
