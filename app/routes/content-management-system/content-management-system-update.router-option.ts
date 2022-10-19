import { headers, adminSecureErrors } from '../shared-schema';

const updateContentManagementSystemRouterOpts = {
  headers,
  description: 'update content management system',
  tags: [
    'admin-role',
    'content-management-system'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  body: {
    type: 'object',
    required: [
      'title', 'content'
    ],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'content management system has been updated',
      type: 'object',
      properties: {
        id: { type: 'number' },
        type: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    },
    404: {
      description: 'no content management system found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default updateContentManagementSystemRouterOpts;
