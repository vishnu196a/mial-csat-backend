import { headers, adminSecureErrors } from '../shared-schema';

const updateContactRouterOpts = {
  headers,
  description: 'update the contact',
  tags: ['admin-role', 'contacts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: ['string', 'null'] },
      email: { type: 'string' },
      terminal_id: { type: 'number' },
      category_id: { type: 'number' },
      sub_category_id: { type: 'number' },
      landline_number: { type: ['string', 'null'] }
    },
  },
  response: {
    200: {
      headers,
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: ['string', 'null'] },
        created_by: { type: 'number' },
        terminal_id: { type: 'number' },
        category_id: { type: 'number' },
        sub_category_id: { type: 'number' },
        landline_number: { type: ['string', 'null'] }
      },
    },
    ...adminSecureErrors,
  },
};

export default updateContactRouterOpts;
