import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listContentManagementSystemRouterOpts = {
  headers,
  description: 'get the list of content management system',
  tags: [
    'admin-role',
    'agent-role',
    'content-management-system'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      title: { type: 'string' },
      per_page: { type: 'number' },
      created_by_name: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of content management system',
      type: 'object',
      properties: {
        pagination,
        content_management_system: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              created_by_id: { type: 'number' },
              created_by_name: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listContentManagementSystemRouterOpts;
