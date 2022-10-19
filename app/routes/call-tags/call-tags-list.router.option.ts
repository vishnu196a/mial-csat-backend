import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listCallTagRouterOpts = {
  headers,
  description: 'get the list of call tags',
  tags: [
    'call-tags',
    'admin-role',
    'agent-role'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      to: { type: 'string' },
      page: { type: 'number' },
      from: { type: 'string' },
      per_page: { type: 'number' },
      call_type: { type: 'string' },
      caller_name: { type: 'string' },
      mode_of_call: { type: 'string' },
      category_name: { type: 'string' },
      contact_number: { type: 'string' },
      created_by_name: { type: 'string' },
      sub_category_name: { type: 'string' },
      o_call_type: { type: 'string', enum: ['ASC', 'DESC'] },
      o_mode_of_call: { type: 'string', enum: ['ASC', 'DESC'] },
      o_date_and_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_contact_number: { type: 'string', enum: ['ASC', 'DESC'] },
      o_created_by_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_call_answer_time: { type: 'string', enum: ['ASC', 'DESC'] },
      o_sub_category_name: { type: 'string', enum: ['ASC', 'DESC'] },
      o_call_reference_number: { type: 'string', enum: ['ASC', 'DESC'] }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of call tags',
      type: 'object',
      properties: {
        pagination,
        call_tags: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              answer: { type: 'string' },
              question: { type: 'string' },
              call_type: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              category_id: { type: 'number' },
              caller_name: { type: 'string' },
              mode_of_call: {
                type: 'string',
                enum: ['Query', 'Request', 'Feedback', 'Emergency', 'Business Enquiry']
              },
              date_and_time: { type: 'string' },
              call_duration: { type: 'string' },
              category_name: { type: 'string' },
              created_by_id: { type: 'number' },
              call_tag_type: { type: 'string' },
              contact_number: { type: 'string' },
              created_by_name: { type: 'string' },
              sub_category_id: { type: 'number' },
              call_answer_time: { type: 'string' },
              sub_category_name: { type: 'string' },
              call_reference_number: { type: 'string' }
            },
          },
        },
      },
    },
    ...adminSecureErrors
  }
};

export default listCallTagRouterOpts;
