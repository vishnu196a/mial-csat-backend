import { pagination, headers, adminSecureErrors } from '../shared-schema';

const listUntagedCallRouterOpts = {
  headers,
  description: 'get the untaged calls',
  tags: ['call-tags', 'admin-role', 'agent-role'],
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
      page: { type: 'number' },
      per_page: { type: 'number' }
    }
  },
  response: {
    headers,
    200: {
      description: 'list of all untaged call tags',
      type: 'object',
      properties: {
        pagination,
        untaged_call_entries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              call_entry_id: { type: 'number' },
              language: { type: 'string' },
              caller_id: { type: 'string' },
              caller_name: { type: 'string' },
              call_tag_id: { type: 'number' },
              id_agent: { type: 'number' },
              datetime_init: { type: 'string' },
              already_tagged: { type: 'boolean' },
              duration: { type: 'number' },
              datetime_end: { type: 'string' },
              duration_wait: { type: 'string' },
              call_reference_number: { type: 'string' }
            }
          }
        }
      }
    },
    ...adminSecureErrors
  }
};

export default listUntagedCallRouterOpts;
