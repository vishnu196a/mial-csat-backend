import { pagination, headers, adminSecureErrors } from '../shared-schema';

const invitationListRouterOpts = {
  headers,
  description: 'get the list of survey form invitation',
  tags: [
    'admin-role',
    'survey-form-invitations'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      type: { type: 'string' },
      page: { type: 'number' },
      contact: { type: 'string' },
      call_id: { type: 'string' },
      per_page: { type: 'number' },
      survey_form_name: { type: 'string' },
      resent_by_name: { type: 'string' },
    },
  },
  response: {
    headers,
    200: {
      description: 'List of survey form invitation',
      type: 'object',
      properties: {
        pagination,
        survey_form_invitations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              survey_form_id: { type: 'number' },
              survey_form_name: { type: 'string' },
              call_id: { type: 'number' },
              type: { type: 'string' },
              status: { type: 'string' },
              contact: { type: 'string' },
              invitation_url: { type: 'string' },
              resent_by_name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
            },
          },
        },
      },
    },
  },
  ...adminSecureErrors,
};

export default invitationListRouterOpts;
