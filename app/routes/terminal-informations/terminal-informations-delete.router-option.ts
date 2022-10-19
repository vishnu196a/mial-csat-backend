import { headers, adminSecureErrors } from '../shared-schema';

const deleteTerminalInformationRouterOpts = {
  headers,
  description: 'delete terminal information',
  tags: ['terminal-informations', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'terminal information deleted',
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    404: {
      description: 'no terminal information found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default deleteTerminalInformationRouterOpts;
