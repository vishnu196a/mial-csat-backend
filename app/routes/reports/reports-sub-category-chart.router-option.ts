import { headers, adminSecureErrors } from '../shared-schema';

const viewSubCategoryChartReportRouterOpts = {
  headers,
  description: 'get the sub category chart report',
  tags: [
    'reports',
    'admin-role'
  ],
  querystring: {
    type: 'object',
    required: ['to', 'from'],
    properties: {
      to: { type: 'string' },
      from: { type: 'string' },
    }
  },
  response: {
    headers,
    200: {
      description: 'Sub category chart report',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          count: { type: 'number' },
          percentage: { type: 'number' }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default viewSubCategoryChartReportRouterOpts;
