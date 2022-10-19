import { headers, adminSecureErrors } from '../shared-schema';

const deleteCallTagRouterOpts = {
  headers,
  description: 'delete call tag',
  tags: ['call-tags', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    headers,
    200: {
      description: 'call tag deleted',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'no call tag found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } },
      },
    },
    ...adminSecureErrors,
  }
};

export default deleteCallTagRouterOpts;
