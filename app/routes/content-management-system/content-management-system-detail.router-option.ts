import { headers, adminSecureErrors } from '../shared-schema';

const contentManagementSystemDetailRouterOpts = {
  headers,
  description: 'get content management system detail',
  tags: [
    'admin-role',
    'agent-role',
    'content-management-system'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'content management system detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        type: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        created_by_id: { type: 'number' },
        created_by_name: { type: 'string' }
      }
    },
    404: {
      description: 'no content management system  found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default contentManagementSystemDetailRouterOpts;
