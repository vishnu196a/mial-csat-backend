import { headers, questions } from '../shared-schema';

const getActiveSurveyFormRouterOpts = {
  headers,
  description: 'get active survey form',
  tags: [
    'ivr',
    'survey-form-invitations'
  ],
  querystring: {
    type: 'object',
    properties: {
      call_id: { type: 'number' },
      contact: { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Active Survey form',
      type: 'object',
      properties: {
        name: { type: 'string' },
        questions: { ...questions },
        survey_form_id: { type: 'number' },
      }
    },
    422: {
      description: 'Unprocessable entity',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    500: {
      description: 'Something went wrong',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    }
  }
};

export default getActiveSurveyFormRouterOpts;
