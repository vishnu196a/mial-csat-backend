import { trimStart } from 'lodash';
import { SwaggerOptions } from 'fastify-swagger';

const baseUrl = trimStart(process.env.BASE_URL, 'https://');

const tagOrder = [
  {
    name: 'ivr',
    description: 'routes related to ivr'
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
    name: 'survey-forms',
    description: 'routes related to survey forms'
  },
  {
    name: 'survey-form-invitations',
    description: 'routes related to survey form invitations'
  },
  {
    name: 'survey-form-responses',
    description: 'routes related to survey form response'
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
