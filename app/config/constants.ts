export const SALT_ROUND = 10;

export const USER_ROLE = {
  admin: 'Admin',
  agent: 'Agent'
};

export const TOKEN_TYPE = {
  resetPassword: 'reset_password',
  changePassword: 'change_password',
  surveyInvitation: 'survey_invitation'
};

export const Q_MINIMUM_SIZE = 3;

export const CATEGORY_BULK_UPLOAD_HEADERS = ['name'];

export const SUB_CATEGORY_BULK_UPLOAD_HEADERS = ['name'];

export const CONTENT_MANAGEMENT_SYSTEM_TYPE = {
  faq: 'FAQ',
  excel: 'Excel',
  freeText: 'Free Text'
};

export const EMAIL_VALIDATION_REGX =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const MOBILE_NUMBER_VALIDATION_REGX =
/^(\+\d{1,3}[- ]?)?\d{10}$/;

export const LANDLINE_NUMBER_VALIDATION_REGX =
/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const SURVEY_FORM_INVITATAION_STATUS = {
  sent: 'Sent',
  responded: 'Responded'
};

export const SURVEY_FORM_INVITATION_TYPE = {
  email: 'Email',
  mobile: 'SMS'
};

export const SUB_CATEGORY_LIMIT_TOP_THREE = 3;

export const SUB_CATEGORY_OFFSET_TOP_THREE = 0;

export const EMERGENCY_CATEGORY_NAME = 'Emergency';

export const IVR_LANGUAGE_CODES = {
  500: 'English',
  501: 'Hindi',
  502: 'Marathi'
};

export const CALL_ENTRY_STATUS = {
  waiting: 'en-cola',
  terminada: 'terminada',
  abandoned: 'abandonada'
};

export const CATEGORY_REPORT_DOWNLOAD_TEMPLATE = [
  'Sl no',
  'Name',
  'Count',
  'Percentage'
];

export const SCHEDULE_TYPE = {
  arrival: 'arrival',
  departure: 'departure'
};

export const REPORT_COLUMNS = {
  "columns": {
    "FEEDBACK": "feedback_emails.feedback as feedback",
    "CALL FLOW": "call_entry.uniqueid as call_flow",
    "CALL TYPE": "call_entry.call_type",
    "AGENT NAME": "users.name as username",
    "CALLER NAME": "call_tags.caller_name",
    "CALL LOG NO": "call_entry.uniqueid",
    "RINGING TIME": "call_entry.datetime_entry_queue",
    "PICKING TIME": "call_entry.datetime_init",
    "FEEDBACK DOJ": "feedback_emails.date_of_journey as feedback_doj",
    "IN QUEUE TIME": "call_entry.duration_wait",
    "CALLER ADDRESS": "call_tags.caller_address",
    "CALL LOG STATUS": "call_entry.status",
    "CALLER EMAIL ID": "call_tags.caller_email_id",
    "CALL ANSWER DESC": "call_tags.answer",
    "CALLER CALLED NO": "call_tags.contact_number",
    "FEEDBACK SUBJECT": "feedback_emails.subject as feedback_subject",
    "EMERGENCY SUBJECT": "emergency_emails.subject",
    "FEEDBACK EMAIL ID": "feedback_emails.email_id as feedback_email_id",
    "CALLER CONTACT NO": "call_tags.contact_number",
    "CALL SUB CATEGORY": "sub_categories.name as sub_category_name",
    "EMERGENCY COMMENTS": "emergency_emails.comments",
    "CALL LOG DATE TIME": "call_entry.datetime_entry_queue",
    "CALL QUESTION DESC": "call_tags.question",
    "CALL CATEGORY NAME": "categories.name as category_name",
    "FEEDBACK RESPONDED": "feedback_emails.responded as feedback_responded",
    "FEEDBACK FLIGHT INFO": "feedback_emails.flight_info as feedback_flight_info",
    "FEEDBACK TO BE RESPOND": "feedback_emails.caller_name as feedback_to_be_respond",
    "EMERGENCY DEPARTMENT ID": "emergency_emails.department"
  },
  "filters": {
    "From Date": "from",
    "To Date": "to",
    "Call Category": "category_id",
    "Call Sub Category": "sub_category_id",
    "Agent": "created_by",
    "Call Source": "type",
    "Status": "status"
  }
};

export const DOWNLOAD_QUEUE_STATUS = {
  done: 'Done',
  failed: 'Failed',
  pending: 'Pending',
  in_progress: 'In Progress'
};

export const MODE_OF_CALL = {
  query: 'Query',
  request: 'Request',
  feedback: 'Feedback',
  emergency: 'Emergency',
  businessEnquiry: 'Business Enquiry'
};

export const DOWNLOAD_REPORT_TYPE = {
  static: 'Static',
  dynamic: 'Dynamic'
};

export const MANUAL_CALL_TAG_TRUNK = 'Manual';
