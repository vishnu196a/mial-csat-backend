import { pagination, headers, adminSecureErrors } from '../shared-schema';

const addTerminalInformationsRouterOpts = {
  headers,
  description: 'create the terminal informations',
  tags: ['admin-role', 'agent-role', 'terminal-informations'],
  body: {
    type: 'object',
    required: [
      'phone',
      'email',
      'location',
      'category',
      'shop_name',
      'terminal_id'
    ],
    properties: {
      phone: { type: 'string' },
      email: { type: 'string' },
      location: { type: 'string' },
      category: { type: 'string' },
      shop_name: { type: 'string' },
      description: { type: 'string' },
      terminal_id: { type: 'number' }
    }
  },
  response: {
    201: {
      description: 'newly added terminal information',
      type: 'object',
      properties: {
        id: { type: 'number' },
        phone: { type: 'string' },
        email: { type: 'string' },
        location: { type: 'string' },
        category: { type: 'string' },
        shop_name: { type: 'string' },
        description: { type: 'string' },
        terminal_id: { type: 'string' }
      }
    }
  }
};

export default addTerminalInformationsRouterOpts;
