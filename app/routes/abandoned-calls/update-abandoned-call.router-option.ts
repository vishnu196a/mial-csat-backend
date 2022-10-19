import { headers, adminSecureErrors } from '../shared-schema';

const callTagDetailRouterOpts = {
  headers,
  description: 'update call back queue',
  tags: [
    'admin-role',
    'agent-role',
    'abandoned-calls'
  ],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },
  body: {
    type: 'object',
    required: [
      'answer',
      'question',
      'caller_name',
      'terminal_id',
      'category_id',
      'call_entry_id',
      'sub_category_id',
    ],
    properties: {
      answer: { type: 'string' },
      question: { type: 'string' },
      caller_name: { type: 'string' },
      terminal_id: { type: 'string' },
      category_id: { type: 'number' },
      call_entry_id: { type: 'number' },
      sub_category_id: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'call back queue has been updated',
      type: 'object',
      properties: {
        id: { type: 'string' },
        language: { type: 'string' },
        caller_id: { type: 'string' },
        caller_name: { type: 'string' },
        call_entry_id: { type: 'number' }
      }
    },
    404: {
      description: 'no call back queue found',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    ...adminSecureErrors
  }
};

export default callTagDetailRouterOpts;
