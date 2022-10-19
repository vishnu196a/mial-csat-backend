import { headers, adminSecureErrors } from '../shared-schema';

const addManagerReportRouterOpts = {
  headers,
  tags: ['admin-role', 'agent-role', 'manager-reports'],
  description: 'add manager report',
  body: {
    type: 'object',
    required: ['name', 'payload'],
    properties: {
      name: { type: 'string' },
      payload: { type: 'object' },
      filter_columns: { type: 'object' }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added manager report',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        filter_columns: {
          type: 'object',
          additionalProperties: true,
          properties: {}
        }
      }
    },
    ...adminSecureErrors
  }
};

export default addManagerReportRouterOpts;
