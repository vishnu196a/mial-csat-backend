import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listSubCategoryReportRouterOpts = {
  headers,
  description: 'get the sub category report list',
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
      description: 'Sub Category report list',
      type: 'object',
      properties: {
        pagination,
        sub_category_reports: {
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

export default listSubCategoryReportRouterOpts;
