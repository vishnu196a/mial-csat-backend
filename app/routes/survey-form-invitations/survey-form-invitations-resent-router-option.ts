import { headers } from '../shared-schema';

const getSurveyFormInvitationRouterOpts = {
  headers,
  description: 'get survey form invitation',
  tags: [
    'admin-role',
    'survey-form-invitations'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    200: {
      description: 'Successfully resent survey form invitation',
      type: 'object',
      properties: {
        id: { type: 'number' },
        type: { type: 'string' },
        contact: { type: 'string' },
        invitation_url: { type: 'string' }
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
export default getSurveyFormInvitationRouterOpts;
