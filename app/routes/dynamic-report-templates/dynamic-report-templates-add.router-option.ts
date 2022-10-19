import { headers, adminSecureErrors } from '../shared-schema';

const addDynamicReportTemplateRouterOpts = {
  headers,
  tags: ['admin-role', 'agent-role', 'dynamic-report-templates'],
  description: 'add dynamic report template',
  body: {
    type: 'object',
    required: ['name', 'payload'],
    properties: {
      name: { type: 'string' },
      payload: {
        type: 'object',
        additionalProperties: true,
        properties: {}
      }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added dynamic report template',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        payload: {
          type: 'object',
          additionalProperties: true,
          properties: {}
        }
      }
    },
    ...adminSecureErrors
  }
};

export default addDynamicReportTemplateRouterOpts;
