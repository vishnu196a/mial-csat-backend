import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listSurveyFormResponseRouterOpts = {
  headers,
  description: 'get the list of survey form responses',
  tags: [
    'admin-role',
    'survey-form-responses'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' },
      user_name: { type: 'string' },
      survey_form_name: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of survey form responses',
      type: 'object',
      properties: {
        pagination,
        survey_form_responses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              score: { type: 'number' },
              user_id: { type: 'number' },
              user_name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              survey_form_id: { type: 'number' },
              survey_form_name: { type: 'string' },
              survey_form_invitation_id: { type: 'number' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listSurveyFormResponseRouterOpts;
