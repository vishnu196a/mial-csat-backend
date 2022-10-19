import { headers, adminSecureErrors } from '../shared-schema';

const invitationDetailRouterOpts = {
  headers,
  description: 'get survey form invitation detail',
  tags: [
    'admin-role',
    'survey-form-invitations'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    headers,
    200: {
      description: 'survey form invitation detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        call_id: { type: 'number' },
        survey_form_id: { type: 'string' },
        survey_form_name: { type: 'string' },
        type: { type: 'string' },
        status: { type: 'string' },
        contact: { type: 'string' },
        invitation_url: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
    ...adminSecureErrors,
  },
};

export default invitationDetailRouterOpts;
