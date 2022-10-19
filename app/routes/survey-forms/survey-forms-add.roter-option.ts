import { headers, adminSecureErrors, questions } from '../shared-schema';

const addSurveyFormRouterOpts = {
  headers,
  description: 'create survey form',
  tags: ['survey-forms', 'admin-role'],
  body: {
    type: 'object',
    required: ['name', 'questions'],
    properties: {
      name: { type: 'string' },
      questions: { ...questions }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added survey forms',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        questions: { ...questions }
      }
    },
    ...adminSecureErrors,
  },
};

export default addSurveyFormRouterOpts;
