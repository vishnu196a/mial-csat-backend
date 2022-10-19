import { headers, responses, adminSecureErrors } from '../shared-schema';

const addSurveyFormResponseRouterOpts = {
  headers,
  description: 'add survey form response',
  tags: ['survey-form-responses'],
  body: {
    type: 'object',
    required: [
      'responses', 'survey_form_id', 'survey_form_invitation_id'
    ],
    properties: {
      responses,
      additionalProperties: true,
      survey_form_id: { type: 'number' },
      survey_form_invitation_id: { type: 'number' }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added survey form response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        user_id: { type: 'number' },
        responses: { ...responses },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        survey_form_id: { type: 'number' },
        survey_form_invitation_id: { type: 'string' }
      }
    },
    ...adminSecureErrors
  }
};

export default addSurveyFormResponseRouterOpts;
