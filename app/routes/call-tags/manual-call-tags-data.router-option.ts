import { headers, adminSecureErrors } from '../shared-schema';

const callTagDataRouterOpts = {
  headers,
  description: 'add manual call tag',
  tags: ['call-tags', 'admin-role', 'agent-role'],
  body: {
    type: 'object',
    required: [
      'answer',
      'callerid',
      'question',
      'category_id',
      'mode_of_call',
      'datetime_end',
      'datetime_init',
      'sub_category_id',
      'id_queue_call_entry',
      'datetime_entry_queue'
    ],
    properties: {
      mode_of_call: {
        type: 'string',
        enum: ['Query', 'Request', 'Feedback', 'Emergency', 'Business Enquiry']
      },
      answer: { type: 'string' },
      question: { type: 'string' },
      callerid: { type: 'string' },
      caller_name: { type: 'string' },
      terminal_id: { type: 'string' },
      category_id: { type: 'number' },
      datetime_end: { type: 'string' },
      datetime_init: { type: 'string' },
      caller_email_id: { type: ['string', 'null'] },
      sub_category_id: { type: 'number' },
      id_queue_call_entry: { type: 'number' },
      datetime_entry_queue: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'added manual call tag',
      type: 'object',
      properties: {
        id: { type: 'number' },
        mode_of_call: {
          type: 'string',
          enum: ['Query', 'Request', 'Feedback', 'Emergency', 'Business Enquiry']
        },
        answer: { type: 'string' },
        question: { type: 'string' },
        caller_name: { type: 'string' },
        terminal_id: { type: 'number' },
        category_id: { type: 'number' },
        call_entry_id: { type: 'number' },
        caller_email_id: { type: ['string', 'null'] },
        sub_category_id: { type: 'number' }
      },
    },
    ...adminSecureErrors,
  },
};

export default callTagDataRouterOpts;
