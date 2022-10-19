import { headers, questions } from '../shared-schema';

const invitationFormRouterOpts = {
  schema: {
    description: 'get survey form',
    tags: [
      'admin-role',
      'survey-form-invitations'
    ],
    querystring: {
      type: 'object',
      properties: {
        t: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'survey form',
        type: 'object',
        properties: {
          name: { type: 'string' },
          user_id: { type: 'number' },
          questions: { ...questions },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          created_by_id: { type: 'number' },
          survey_form_id: { type: 'number' },
          created_by_name: { type: 'string' },
          survey_form_invitation_id: { type: 'number' }
        }
      }
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
};

export default invitationFormRouterOpts;
