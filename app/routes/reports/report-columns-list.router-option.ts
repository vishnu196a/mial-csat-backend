import { headers, adminSecureErrors } from '../shared-schema';

const listReportColumnsRouterOpts = {
  headers,
  description: 'get the report columns',
  tags: [
    'reports',
    'admin-role',
    'agent-role'
  ],
  response: {
    headers,
    200: {
      description: 'Report columns list',
      type: 'object',
      properties: {
        "columns": {
          type: 'object',
          properties: {
            "FEEDBACK": { type: 'string' },
            "CALL FLOW": { type: 'string' },
            "CALL TYPE": { type: 'string' },
            "AGENT NAME": { type: 'string' },
            "CALLER NAME": { type: 'string' },
            "CALL LOG NO": { type: 'string' },
            "RINGING TIME": { type: 'string' },
            "PICKING TIME": { type: 'string' },
            "FEEDBACK DOJ": { type: 'string' },
            "IN QUEUE TIME": { type: 'string' },
            "CALLER ADDRESS": { type: 'string' },
            "CALL LOG STATUS": { type: 'string' },
            "CALLER EMAIL ID": { type: 'string' },
            "CALL ANSWER DESC": { type: 'string' },
            "CALLER CALLED NO": { type: 'string' },
            "FEEDBACK SUBJECT": { type: 'string' },
            "EMERGENCY SUBJECT": { type: 'string' },
            "FEEDBACK EMAIL ID": { type: 'string' },
            "CALLER CONTACT NO": { type: 'string' },
            "CALL SUB CATEGORY": { type: 'string' },
            "EMERGENCY COMMENTS": { type: 'string' },
            "CALL LOG DATE TIME": { type: 'string' },
            "CALL QUESTION DESC": { type: 'string' },
            "CALL CATEGORY NAME": { type: 'string' },
            "FEEDBACK RESPONDED": { type: 'string' },
            "FEEDBACK FLIGHT INFO": { type: 'string' },
            "FEEDBACK TO BE RESPOND": { type: 'string' },
            "EMERGENCY DEPARTMENT ID": { type: 'string' },
          }
        },
        "filters": {
          type: 'object',
          properties: {
            "From Date": { type: 'string' },
            "To Date": { type: 'string' },
            "Call Category": { type: 'string' },
            "Call Sub Category": { type: 'string' },
            "Agent": { type: 'string' },
            "Call Source": { type: 'string' },
            "Status": { type: 'string' }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listReportColumnsRouterOpts;
