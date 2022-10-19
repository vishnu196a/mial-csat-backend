import { headers, adminSecureErrors } from '../shared-schema';

const deleteContentManagementSystemRouterOpts = {
  headers,
  description: 'delete content management system',
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
  response: {
    headers,
    200: {
      description: 'content management system has been deleted',
      type: 'object',
      properties: {
        message: { type: 'string' }
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

export default deleteContentManagementSystemRouterOpts;
