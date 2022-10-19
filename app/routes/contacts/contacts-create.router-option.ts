import { headers, adminSecureErrors } from '../shared-schema';

const createContactRouterOpts = {
  headers,
  description: 'add contact',
  tags: ['admin-role', 'contacts'],
  body: {
    type: 'object',
    required: [
      'name',
      'email',
      'terminal_id',
      'category_id',
      'sub_category_id'
    ],
    anyOf: [
      { required: ['phone'] },
      { required: ['landline_number'] }
    ],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      phone: { type: ['string', 'null'] },
      terminal_id: { type: 'number' },
      category_id: { type: 'number' },
      sub_category_id: { type: 'number' },
      landline_number: { type: ['string', 'null'] }
    },
  },
  response: {
    headers,
    201: {
      description: 'newly added contact',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: ['string', 'null'] },
        created_by: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        terminal_id: { type: 'number' },
        category_id: { type: 'number' },
        sub_category_id: { type: 'number' },
        landline_number: { type: ['string', 'null'] },
      },
    },
    ...adminSecureErrors,
  },
};

export default createContactRouterOpts;
