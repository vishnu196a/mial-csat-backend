import { headers } from '../shared-schema';

const surveyFormInvitationMobileRouterOpts = {
  headers,
  description: 'send survey form invitation to mobile',
  tags: [
    'ivr',
    'survey-form-invitations'
  ],
  body: {
    type: 'object',
    required: ['contact', 'call_id'],
    properties: {
      call_id: { type: 'number' },
      contact: { type: 'string' },
      agent_id: { type: 'number' }
    }
  },
  response: {
    200: {
      description: 'Successfully sent survey form invitation to mobile',
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
};
export default surveyFormInvitationMobileRouterOpts;
