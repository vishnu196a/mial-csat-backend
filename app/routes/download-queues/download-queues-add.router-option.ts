import { DOWNLOAD_QUEUE_STATUS } from '../../config/constants';
import { headers, adminSecureErrors } from '../shared-schema';

const addDownloadQueueRouterOpts = {
  headers,
  description: 'add download queue',
  tags: [
    'admin-role',
    'agent-role',
    'download-queues'
  ],
  body: {
    type: 'object',
    required: ['name', 'payload'],
    additionalProperties: true,
    properties: {
      name: { type: 'string' },
      payload: {
        type: 'object',
        additionalProperties: true,
        properties:{}
      },
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
          properties:{}
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

export default addDownloadQueueRouterOpts;
