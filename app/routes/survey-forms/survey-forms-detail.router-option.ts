import { headers, questions, adminSecureErrors } from '../shared-schema';

const detailSurveyFormRouterOpts = {
  headers,
  description: 'detail survey form',
  tags: ['survey-forms', 'admin-role'],
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
      description: 'survey form detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        is_active: { type: 'boolean' },
        questions: { ...questions },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    },
    ...adminSecureErrors,
  },
};

export default detailSurveyFormRouterOpts;
