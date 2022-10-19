import { headers, adminSecureErrors } from '../shared-schema';

const updateCategoryRouterOpts = {
  headers,
  description: 'update the category',
  tags: [
    'categories',
    'admin-role'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
  },
  response: {
    headers,
    200: {
      description: 'newly updated category',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
    },
    ...adminSecureErrors,
  },
};

export default updateCategoryRouterOpts;
