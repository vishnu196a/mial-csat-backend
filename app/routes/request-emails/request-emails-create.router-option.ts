import { headers, adminSecureErrors } from '../shared-schema';

const createFeedbackEmailRouterOpts = {
  headers,
  description: 'send request email',
  tags: ['request-emails', 'admin-role', 'agent-role'],
  body: {
    type: 'object',
    required: [
      'title',
      'subject',
      'mobile_no',
      'first_name',
      'call_entry_id',
      'meet_and_assist',
      'mail_to_feedback_team',
      'contact_person_email_id'
    ],
    properties: {
      city: { type: 'string' },
      email: { type: 'string' },
      title: { type: 'string' },
      address: { type: 'string' },
      subject: { type: 'string' },
      country: { type: 'string' },
      telephone: { type: 'string' },
      mobile_no: { type: 'string' },
      last_name: { type: 'string' },
      first_name: { type: 'string' },
      postal_code: { type: 'string' },
      nationality: { type: 'string' },
      call_entry_id: { type: 'number' },
      date_of_birth: { type: 'string' },
      place_of_make: { type: 'string' },
      date_of_issue: { type: 'string' },
      meet_and_assist: { type: 'string' },
      passport_number: { type: 'string' },
      port_of_destination: { type: 'string' },
      mail_to_feedback_team: { type: 'boolean' },
      contact_person_email_id: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  response: {
    headers,
    201: {
      description: 'request email has been sent',
      type: 'object',
      properties: {
        id: { type: 'number' },
        city: { type: 'string' },
        email: { type: 'string' },
        title: { type: 'string' },
        address: { type: 'string' },
        subject: { type: 'string' },
        country: { type: 'string' },
        telephone: { type: 'string' },
        mobile_no: { type: 'string' },
        last_name: { type: 'string' },
        first_name: { type: 'string' },
        postal_code: { type: 'string' },
        nationality: { type: 'string' },
        call_entry_id: { type: 'number' },
        date_of_birth: { type: 'string' },
        place_of_make: { type: 'string' },
        date_of_issue: { type: 'string' },
        meet_and_assist: { type: 'string' },
        passport_number: { type: 'string' },
        port_of_destination: { type: 'string' },
        mail_to_feedback_team: { type: 'boolean' }
      }
    },
    ...adminSecureErrors,
  }
};

export default createFeedbackEmailRouterOpts;
