import { headers } from '../shared-schema';

const createSurveyFormInvitationRouterOpts = {
  schema: {
    headers,
    description: 'create survey form invitation',
    tags: [
      'ivr',
      'survey-form-invitations'
    ],
    body: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['SMS', 'Email'] },
        call_id: { type: 'number' },
        contact: { type: 'string' },
        user_id: { type: 'number' },
        agent_id: { type: 'number' },
        survey_form_id: { type: 'number' },
        invitation_url: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Survey form invitation Created Successfully ',
        type: 'object',
        properties: {
          message: { type: 'string' }
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
  }
};

export default createSurveyFormInvitationRouterOpts;
