import { headers, adminSecureErrors } from '../shared-schema';

const contactDetailRouterOpts = {
  headers,
  description: 'contact detail',
  tags: ['contacts', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    },
  },
  response: {
    headers,
    200: {
      description: 'get the contact detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        phone: { type: ['string', 'null'] },
        email: { type: 'string' },
        category_id: { type: 'number' },
        terminal_id: { type: 'number' },
        created_by_id: { type: 'number' },
        terminal_name: { type: 'string' },
        category_name: { type: 'string' },
        landline_number: { type: ['string', 'null'] },
        created_by_name: { type: 'string' },
        sub_category_id: { type: 'number' },
        sub_category_name: { type: 'string' }
      },
    },
    ...adminSecureErrors,
  },
};

export default contactDetailRouterOpts;
