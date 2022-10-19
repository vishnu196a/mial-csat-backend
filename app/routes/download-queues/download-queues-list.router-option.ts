import { DOWNLOAD_QUEUE_STATUS } from '../../config/constants';
import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listUserRouterOpts = {
  headers,
  description: 'get the list of download queues',
  tags: [
    'admin-role',
    'agent-role',
    'download-queues'
  ],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      name: { type: 'string' },
      status: { type: 'string' },
      per_page: { type: 'number' },
      user_name: { type: 'string' }
    }
  },
  response: {
    headers,
    200: {
      description: 'List of download queues',
      type: 'object',
      properties: {
        pagination,
        download_queues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              status: {
                type: 'string',
                enum: Object.values(DOWNLOAD_QUEUE_STATUS)
              },
              user_id: { type: 'number' },
              user_name: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              report_download_link: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listUserRouterOpts;
