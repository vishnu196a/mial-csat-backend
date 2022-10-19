import { headers, adminSecureErrors } from '../shared-schema';

const createFeedbackEmailRouterOpts = {
  headers,
  description: 'send feedback email',
  tags: ['feedback-emails', 'admin-role', 'agent-role'],
  body: {
    type: 'object',
    required: [
      'subject',
      'feedback',
      'email_id',
      'flight_info',
      'caller_name',
      'call_entry_id',
      'date_of_journey'
    ],
    properties: {
      subject: { type: 'string' },
      feedback: { type: 'string' },
      email_id: {
        type: 'array',
        items: { type: 'string' }
      },
      responded: { type: 'string' },
      flight_info: { type: 'string' },
      caller_name: { type: 'string' },
      call_entry_id: { type: 'string' },
      date_of_journey: { type: 'string' },
      mail_to_feedback_team: { type: 'boolean' }
    }
  },
  response: {
    headers,
    201: {
      description: 'feedback email has been sent',
      type: 'object',
      properties: {
        id: { type: 'number' },
        subject: { type: 'string' },
        feedback: { type: 'string' },
        responded: { type: 'string' },
        flight_info: { type: 'string' },
        caller_name: { type: 'string' },
        call_entry_id: { type: 'string' },
        date_of_journey: { type: 'string' },
        mail_to_feedback_team: { type: 'boolean' }
      }
    },
    ...adminSecureErrors,
  }
};

export default createFeedbackEmailRouterOpts;
