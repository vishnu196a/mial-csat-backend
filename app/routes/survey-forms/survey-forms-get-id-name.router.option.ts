import { headers, adminSecureErrors } from '../shared-schema';

const listCurrentSurveyFormRouterOpts = {
  headers,
  description: 'get the ids and names of current survey form',
  tags: ['survey-forms', 'admin-role'],
  response: {
    headers,
    200: {
      description: 'ids and names of current survey form',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' }
        }
      }
    },
    ...adminSecureErrors,
  },
};

export default listCurrentSurveyFormRouterOpts;
