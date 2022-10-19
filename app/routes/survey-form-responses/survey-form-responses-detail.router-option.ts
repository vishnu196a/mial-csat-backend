import { headers, responses, adminSecureErrors } from '../shared-schema';

const surveyFormResponseDetailRouterOpts = {
  headers,
  description: 'detail survey form response',
  tags: [
    'admin-role',
    'survey-form-responses'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'get the survey form response detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        responses: { ...responses },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        survey_form_id: { type: 'number' },
        survey_form_name: { type: 'string' },
        survey_form_invitation_id: { type: 'string' }
      }
    },
    404: {
      description: 'no survey form response found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default surveyFormResponseDetailRouterOpts;
