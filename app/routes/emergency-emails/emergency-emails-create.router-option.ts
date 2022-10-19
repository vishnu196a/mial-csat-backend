import { headers, adminSecureErrors } from '../shared-schema';

const createEmergencyEmailRouterOpts = {
  headers,
  description: 'send emergency email',
  tags: ['emergency-emails', 'admin-role', 'agent-role'],
  body: {
    type: 'object',
    required: [
      'subject',
      'email_id',
      'comments',
      'call_entry_id',
      'contact_person'
    ],
    properties: {
      subject: { type: 'string' },
      phone_no: { type: 'string' },
      email_id: {
        type: 'array',
        items: { type: 'string' }
      },
      comments: { type: 'string' },
      department: { type: 'string' },
      call_entry_id: { type: 'number' },
      contact_person: { type: 'string' }
    }
  },
  response: {
    headers,
    201: {
      description: 'emergency email has been sent',
      type: 'object',
      properties: {
        id: { type: 'number' },
        subject: { type: 'string' },
        phone_no: { type: 'string' },
        comments: { type: 'string' },
        department: { type: 'string' },
        call_entry_id: { type: 'number' },
        contact_person: { type: 'string' }
      }
    },
    ...adminSecureErrors,
  }
};

export default createEmergencyEmailRouterOpts;
