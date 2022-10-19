import { trimStart } from 'lodash';
import { SwaggerOptions } from 'fastify-swagger';

const baseUrl = trimStart(process.env.BASE_URL, 'https://');

const tagOrder = [
  {
    name: 'users',
    description: 'routes related to user'
  },
  {
    name: 'ivr',
    description: 'routes related to ivr'
  },
  {
    name: 'sso',
    description: 'routes related to sso'
  },
  {
    name: 'reports',
    description: 'routes related to report'
  },
  {
    name: 'terminals',
    description: 'routes related to terminal'
  },
  {
    name: 'sessions',
    description: 'routes related to sessions'
  },
  {
    name: 'passwords',
    description: 'routes related to passwords'
  },
  {
    name: 'roles',
    description: 'routes related to roles'
  },
  {
    name: 'admin-role',
    description: 'routes related to admin'
  },
  {
    name: 'agent-role',
    description: 'routes related to agent'
  },
  {
    name: 'categories',
    description: 'routes related to categories'
  },
  {
    name: 'sub-categories',
    description: 'routes related to sub categories'
  },
  {
    name: 'content-management-system',
    description: 'routes related to content management system'
  },
  {
    name: 'live-call',
    description: 'routes related to live call'
  },
  {
    name: 'flight-status',
    description: 'routes related to flight status'
  },
  {
    name: 'call-tags',
    description: 'routes related to call tags'
  },
  {
    name: 'survey-forms',
    description: 'routes related to survey forms'
  },
  {
    name: 'survey-form-invitations',
    description: 'routes related to survey form invitations'
  },
  {
    name: 'contacts',
    description: 'routes related to contacts'
  },
  {
    name: 'abandoned-calls',
    description: 'routes related to abandoned calls'
  },
  {
    name: 'terminal-informations',
    description: 'routes related to terminal informations'
  },
  {
    name: 'feedback-emails',
    description: 'routes related to feedback emails'
  },
  {
    name: 'request-emails',
    description: 'routes related to request emails'
  },
  {
    name: 'emergency-emails',
    description: 'routes related to emergency emails'
  },
  {
    name: 'business-enquiry-emails',
    description: 'routes related to business enquiry emails'
  },
  {
    name: 'manager-reports',
    description: 'routes related to manager reports'
  },
  {
    name: 'queue-call-entry',
    description: 'routes related to queue call entry'
  }
];

const swaggerOptions: SwaggerOptions = {
  routePrefix: '/doc',
  exposeRoute: true,
  swagger: {
    tags: tagOrder,
    info: {
      title: 'MIAL API',
      description:
        'Building a blazing fast REST API with Node.js, Postgresql, Fastify and Swagger',
      version: '1.0.0'
    },
    host: baseUrl,
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
};
export default swaggerOptions;
