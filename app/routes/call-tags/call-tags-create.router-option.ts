import { headers, adminSecureErrors } from '../shared-schema';

const createCallTagRouterOpts = {
  headers,
  description: 'create the call tag',
  tags: ['call-tags', 'admin-role', 'agent-role'],
  body: {
    type: 'object',
    required: [
      'answer',
      'question',
      'category_id',
      'mode_of_call',
      'call_entry_id',
      'sub_category_id',
    ],
    properties: {
      mode_of_call: {
        type: 'string',
        enum: ['Query', 'Request', 'Feedback', 'Emergency', 'Business Enquiry']
      },
      answer: { type: 'string' },
      question: { type: 'string' },
      caller_name: { type: 'string' },
      terminal_id: { type: 'string' },
      category_id: { type: 'number' },
      call_entry_id: { type: 'number' },
      contact_number: { type: ['string', 'null'] },
      caller_email_id: { type: ['string', 'null'] },
      sub_category_id: { type: 'number' }
    }
  },
  response: {
    headers,
    201: {
      description: 'newly added call tag',
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
      }
    },
    ...adminSecureErrors,
  }
};

export default createCallTagRouterOpts;
