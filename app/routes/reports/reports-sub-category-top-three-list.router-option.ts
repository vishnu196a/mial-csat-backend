import { headers, adminSecureErrors } from '../shared-schema';

const listTopThreeSubCategoryReportRouterOpts = {
  headers,
  description: 'get the sub category report top three list',
  tags: [
    'reports',
    'admin-role'
  ],
  params: {
    type: 'object',
    required: ['category_id'],
    properties: {
      category_id: { type: 'number' }
    }
  },
  querystring: {
    type: 'object',
    required: ['to', 'from'],
    properties: {
      to: { type: 'string' },
      from: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'Sub Category report top three list',
      type: 'array',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        count: { type: 'number' },
        percentage: { type: 'number' }
      }
    },
    ...adminSecureErrors
  }
};

export default listTopThreeSubCategoryReportRouterOpts;
