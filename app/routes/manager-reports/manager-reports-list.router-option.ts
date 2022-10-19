import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listManagerReportsRouterOpts = {
  headers,
  description: 'get the list of manager reports',
  tags: [
    'admin-role',
    'agent-role',
    'manager-reports'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      name: { type: 'string' },
      per_page: { type: 'number' },
      handler_name: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of manager reports',
      type: 'object',
      properties: {
        pagination,
        manager_reports: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              deleted_at: { type: 'string' },
              payload: {
                type: 'object',
                additionalProperties: true,
                properties: {}
              },
              filters: {
                type: 'object',
                additionalProperties: true,
                properties: {}
              }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};
export default listManagerReportsRouterOpts;
