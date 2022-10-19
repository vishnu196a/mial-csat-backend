import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listCategoryReportRouterOpts = {
  headers,
  description: 'get the category report list',
  tags: [
    'reports',
    'admin-role'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      to: { type: 'string' },
      page: { type: 'number' },
      name: { type: 'string' },
      from: { type: 'string' },
      count: { type: 'number' },
      o_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_count: { type: 'string', enum: ['ASC', 'DESC'] },
      per_page: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'Category report list',
      type: 'object',
      properties: {
        pagination,
        category_reports: {
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
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listCategoryReportRouterOpts;
