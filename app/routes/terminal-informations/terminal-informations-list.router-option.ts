import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listTerminalInformationsRouterOpts = {
  headers,
  description: 'get the list of terminal informations',
  tags: [
    'admin-role',
    'agent-role',
    'terminal-informations'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      phone: { type: 'string' },
      email: { type: 'string' },
      category: { type: 'string' },
      per_page: { type: 'number' },
      location: { type: 'string' },
      shop_name: { type: 'string' },
      description: { type: 'string' },
      terminal_name: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of terminal informations',
      type: 'object',
      properties: {
        pagination,
        terminal_informations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              phone: { type: 'string' },
              email: { type: 'string' },
              category: { type: 'string' },
              location: { type: 'string' },
              shop_name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              description: { type: 'string' },
              terminal_id: { type: 'number' },
              terminal_name: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listTerminalInformationsRouterOpts;
