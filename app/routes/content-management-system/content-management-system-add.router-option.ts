import { headers, adminSecureErrors } from '../shared-schema';

const addContentManagementSystemRouterOpts = {
  headers,
  description: 'add content management system',
  tags: [
    'admin-role',
    'content-management-system'
  ],
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
    201: {
      description: 'newly added content management system',
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
    ...adminSecureErrors
  }
};

export default addContentManagementSystemRouterOpts;
