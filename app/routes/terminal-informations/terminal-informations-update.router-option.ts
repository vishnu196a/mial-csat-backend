import { headers, adminSecureErrors } from '../shared-schema';

const updateTerminalInformationsRouterOpts = {
  headers,
  description: 'update the terminal information',
  tags: ['terminal-informations', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  body: {
    type: 'object',
    properties: {
      phone: { type: 'string' },
      email: { type: 'string' },
      category: { type: 'string' },
      location: { type: 'string' },
      shop_name: { type: 'string' },
      description: { type: 'string' },
      terminal_id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
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

export default updateTerminalInformationsRouterOpts;
