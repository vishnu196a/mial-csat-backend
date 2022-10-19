import { headers, adminSecureErrors } from '../shared-schema';

const updateCallTagRouterOpts = {
  headers,
  description: 'update the call tag',
  tags: ['call-tags', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    required: [
      'answer',
      'question',
      'created_by',
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
      category_id: { type: 'string' },
      call_entry_id: { type: 'number' },
      sub_category_id: { tyoe: 'number' },
    },
  },
  response: {
    headers,
    200: {
      description: 'updated call tag',
      type: 'object',
      properties: {
        id: { type: 'number' },
        mode_of_call: {
          type: 'string',
          enum: ['Query', 'Request', 'Feedback', 'Emergency', 'Business Enquiry']
        },
        answer: { type: 'string' },
        question: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        caller_name: { type: 'string' },
        contact_number: { type: 'string' }
      },
    },
    ...adminSecureErrors,
  },
};

export default updateCallTagRouterOpts;
