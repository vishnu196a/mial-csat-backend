import { headers, adminSecureErrors } from '../shared-schema';

const detailTerminalInformationsRouterOpts = {
  headers,
  description: 'Detail the terminal informations',
  tags: ['admin-role', 'terminal-informations'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'Terminal information detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        phone: { type: 'string' },
        email: { type: 'string' },
        category: { type: 'string' },
        location: { type: 'string' },
        shop_name: { type: 'string' },
        description: { type: 'string' },
        terminal_id: { type: 'number' },
        terminal_name: { type: 'string' }
      }
    }
  }
};

export default detailTerminalInformationsRouterOpts;
