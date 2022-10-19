import { headers, adminSecureErrors } from '../shared-schema';
const detailCallTagRouterOpts = {
  headers,
  description: 'call tag detail',
  tags: ['call-tags', 'admin-role'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    }
  },
  response: {
    headers,
    200: {
      description: 'call tag detail',
      type: 'object',
      properties: {
        id: { type: 'number' },
        mode_of_call: {
          type: 'string',
          enum: ['Query', 'Request', 'Feedback', 'Emergency', 'Business Enquiry']
        },
        answer: { type: 'string' },
        question: { type: 'string' },
        call_type: { type: 'string' },
        created_by: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        terminal_id: { type: ['number', 'null'] },
        category_id: { type: 'number' },
        caller_name: { type: ['string', 'null'] },
        call_duration: { type: 'string' },
        category_name: { type: 'string' },
        call_entry_id: { type: 'number' },
        call_tag_type: { type: 'string' },
        contact_number: { type: ['string', 'null'] },
        sub_category_id: { type: 'number' },
        call_answer_time: { type: 'string' },
        sub_category_name: { type: 'string' },
        call_reference_number: { type: ['string', 'null'] },
      },
    },
    ...adminSecureErrors,
  },
};

export default detailCallTagRouterOpts;
