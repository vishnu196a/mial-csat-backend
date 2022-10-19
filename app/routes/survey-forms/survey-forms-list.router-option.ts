import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listSurveyFormRouterOpts = {
  headers,
  description: 'get the list of survey forms',
  tags: ['survey-forms', 'admin-role'],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      name: { type: 'string' },
      per_page: { type: 'number' },
      created_by_name: { type: 'string' },
      updated_by_name: { type: 'string' }
    },
  },
  response: {
    headers,
    200: {
      description: 'List of survey forms',
      type: 'object',
      properties: {
        pagination,
        survey_forms: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              is_active: { type: 'boolean' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              created_by_id: { type: 'number' },
              updated_by_id: { type: 'number' },
              created_by_name: { type: 'string' },
              updated_by_name: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors,
  }
};

export default listSurveyFormRouterOpts;
