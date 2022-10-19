import { adminSecureErrors, headers, pagination } from '../shared-schema';
const listContactRouterOpts = {
  headers,
  description: 'get the list of contacts',
  tags: ['admin-role', 'agent-role', 'contacts'],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      name: { type: 'string' },
      page: { type: 'number' },
      email: { type: 'string' },
      per_page: { type: 'number' },
      mobile_no: { type: 'string' },
      terminal_name: { type: 'string' },
      category_name: { type: 'string' },
      landline_number: { type: 'string' },
      created_by_name: { type: 'string' },
      sub_category_name: { type: 'string' }
    },
  },
  response: {
    200: {
      headers,
      type: 'object',
      properties: {
        pagination,
        contacts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: ['string', 'null'] },
              terminal_id: { type: 'number' },
              category_id: { type: 'number' },
              terminal_name: { type: 'string' },
              category_name: { type: 'string' },
              created_by_id: { type: 'number' },
              sub_category_id: { type: 'number' },
              landline_number: { type: ['string', 'null'] },
              created_by_name: { type: 'string' },
              sub_category_name: { type: 'string' }
            },
          },
        },
      },
    },
    ...adminSecureErrors,
  },
};

export default listContactRouterOpts;
