import { headers, adminSecureErrors } from '../shared-schema';

const deleteContactRouterOpts = {
  headers,
  description: 'Delete contact',
  tags: ['admin-role', 'contacts'],
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
      description: 'Contact has been deleted',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    ...adminSecureErrors,
  },
};

export default deleteContactRouterOpts;
