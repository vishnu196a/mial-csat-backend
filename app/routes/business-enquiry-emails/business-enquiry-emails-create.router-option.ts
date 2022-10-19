import { headers, adminSecureErrors } from '../shared-schema';

const createBusinessEnquiryEmailRouterOpts = {
  headers,
  description: 'send business enquiry email',
  tags: ['business-enquiry-emails', 'admin-role', 'agent-role'],
  body: {
    type: 'object',
    required: [
      'comments',
      'email_id',
      'call_entry_id'
    ],
    properties: {
      name: { type: ['string', 'null'] },
      date: { type: ['string', 'null'] },
      phone_no: { type: ['string', 'null'] },
      comments: { type: 'string' },
      email_id: {
        type: 'array',
        items: { type: 'string' }
      },
      call_entry_id: { type: 'number' },
      customer_email_id: { type: ['string', 'null'] }
    }
  },
  response: {
    headers,
    201: {
      description: 'business enquiry email has been sent',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: ['string', 'null'] },
        date: { type: ['string', 'null'] },
        phone_no: { type: ['string', 'null'] },
        comments: { type: 'string' },
        call_entry_id: { type: 'number' },
        customer_email_id: { type: ['string', 'null'] }
      }
    },
    ...adminSecureErrors,
  }
};

export default createBusinessEnquiryEmailRouterOpts;
