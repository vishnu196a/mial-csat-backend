import { headers } from '../shared-schema';

const surveyFormEmailRouterOpts = {
  headers,
  description: 'send survey form invitation',
  tags: [
    'ivr',
    'survey-form-invitations'
  ],
  body: {
    type: 'object',
    required: ['contact', 'call_id'],
    properties: {
      call_id: { type: 'number' },
      contact: { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Successfully sent survey form invitation',
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

export default surveyFormEmailRouterOpts;
