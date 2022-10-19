import { headers, adminSecureErrors } from '../shared-schema';

const createCategoryRouterOpts = {
  headers,
  description: 'create the category',
  tags: [
    'categories',
    'admin-role'
  ],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
  },
  response: {
    headers,
    201: {
      description: 'newly added category',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
    },
    ...adminSecureErrors,
  },
};

export default createCategoryRouterOpts;
