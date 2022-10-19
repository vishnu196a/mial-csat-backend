import { headers, questions, adminSecureErrors } from '../shared-schema';

const updateSurveyFormRouterOpts = {
  headers,
  description: 'update the survey form',
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
      description: 'updated survey forms',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        is_active: { type: 'boolean' },
        questions: { ...questions },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      }
    },
    ...adminSecureErrors,
  },
};

export default updateSurveyFormRouterOpts;
