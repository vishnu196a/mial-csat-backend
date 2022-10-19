import listSurveyFormResponseRouterOpts from './survey-form-responses-list.router-option';
import surveyFormResponseDetailRouterOpts from './survey-form-responses-detail.router-option';

import { FastifyInstance } from 'fastify';

import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  canView,
  canViewDetail
} from '../../hooks/survery-form-response-policy.hooks';
import {
  list,
  detailSurveyFormResponse
} from '../../controllers/v1/survey-form-responses.controller';

function surveyFormResponsesPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {

  fastify.route({
    method: 'GET',
    url: '/v1/surveys/responses',
    schema: listSurveyFormResponseRouterOpts,
    preHandler: canView,
    handler: list
  });

  fastify.route({
    method: 'GET',
    url: '/v1/surveys/responses/:id',
    schema: surveyFormResponseDetailRouterOpts,
    preHandler: canViewDetail,
    handler: detailSurveyFormResponse
  });

  next();
}
export default surveyFormResponsesPrivateRoutes;
