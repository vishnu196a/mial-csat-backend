import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listDynamicReportTemplatesRouterOpts = {
  headers,
  description: 'get the list of dynamic report templates',
  tags: [
    'admin-role',
    'agent-role',
    'dynamic-report-templates'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      name: { type: 'string' },
      per_page: { type: 'number' }
    },
  },
  response: {
    headers,
    200: {
      description: 'List of dynamic report templates',
      type: 'object',
      properties: {
        pagination,
        dynamic_report_templates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              payload: {
                type: 'object',
                additionalProperties: true,
                properties: {}
              }
            },
          },
        },
      },
    },
    ...adminSecureErrors,
  },
};
export default listDynamicReportTemplatesRouterOpts;
