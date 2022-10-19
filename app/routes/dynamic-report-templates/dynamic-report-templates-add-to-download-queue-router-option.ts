import { DOWNLOAD_QUEUE_STATUS } from '../../config/constants';
import { headers, adminSecureErrors } from '../shared-schema';

const addDynamicReportTemplateToDownloadQueueRouterOpts = {
  headers,
  description: 'add dynamic report template to queue',
  tags: ['admin-role', 'agent-role', 'dynamic-report-templates'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  },
  body: {
    type: 'object',
    properties: {
      filters: {
        type: 'object',
        properties: {
          to: { type: 'string' },
          from: { type: 'string' },
          call_type: { type: 'string' },
          user_name: { type: 'string' },
          mode_of_call: { type: 'string' }
        }
      }
    }
  },

  response: {
    headers,
    201: {
      description: 'newly added download queue',
      type: 'object',
      additionalProperties: true,
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        status: {
          type: 'string',
          enum: Object.values(DOWNLOAD_QUEUE_STATUS)
        },
        payload: {
          type: 'object',
          additionalProperties: true,
          properties: {}
        },
        user_id: { type: 'number' },
        user_name: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        report_download_link: { type: 'string' }
      }
    },
    ...adminSecureErrors
  }
};

export default addDynamicReportTemplateToDownloadQueueRouterOpts;
