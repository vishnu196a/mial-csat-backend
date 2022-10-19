import { headers, pagination, adminSecureErrors } from '../shared-schema';

const detailSurveyFormRouterOpts = {
  headers,
  description: 'report of survey form',
  tags: ['survey-forms', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' },
      user_name: { type: 'string' }
    },
  },
  response: {
    headers,
    200: {
      description: 'List of survey form report',
      type: 'object',
      properties: {
        pagination,
        survey_form_reports: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              user_id: { type: 'number' },
              avg_score: { type: 'number' },
              user_name: { type: 'string' },
              total_score: { type: 'number' },
              no_of_feedback: { type: 'number' },
              survey_form_id: { type: 'number' },
              survey_form_name: { type: 'string' },
              score_percentage: { type: 'number' }
            }
          }
        }
      }
    },
    ...adminSecureErrors,
  }
};

export default detailSurveyFormRouterOpts;
