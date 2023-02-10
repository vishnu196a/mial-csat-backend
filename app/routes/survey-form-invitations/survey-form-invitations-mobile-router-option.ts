import { adminSecureErrors, headers } from '../shared-schema';

const surveyFormInvitationMobileRouterOpts = {
  headers,
  description: 'send survey form invitation to mobile',
  tags: [
    'ivr',
    'survey-form-invitations'
  ],
  querystring: {
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
        id: { type: 'number' }
      }
    }
  },
  ...adminSecureErrors
};
export default surveyFormInvitationMobileRouterOpts;
