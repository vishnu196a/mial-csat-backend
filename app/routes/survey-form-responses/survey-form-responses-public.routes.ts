import addSurveyFormResponseRouterOpts from './survey-form-responses-add.router-option';

import { FastifyInstance } from 'fastify';
import { addSurveyFormResponse } from '../../controllers/v1/survey-form-responses.controller';

import { IncomingMessage, Server, ServerResponse } from 'http';

function surveyFormResponsesPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/surveys/responses',
    schema: addSurveyFormResponseRouterOpts,
    handler: addSurveyFormResponse
  });

  next();
}
export default surveyFormResponsesPublicRoutes;
