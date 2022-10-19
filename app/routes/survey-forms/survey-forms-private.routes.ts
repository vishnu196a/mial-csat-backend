import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import addSurveyFormRouterOpts from './survey-forms-add.roter-option';
import listSurveyFormRouterOpts from './survey-forms-list.router-option';
import updateSurveyFormRouterOpts from './survey-forms-update.router-option';
import detailSurveyFormRouterOpts from './survey-forms-detail.router-option';
import surveyFormReportRouterOpts from './survey-forms-report.router-option';
import listCurrentSurveyFormRouterOpts from './survey-forms-get-id-name.router.option';

import {
  canAdd,
  canView,
  canUpdate,
  canViewReportList
} from '../../hooks/survey-form-policy.hooks';
import {
  list,
  listCurrent,
  addSurveyForm,
  updateSurveyForm,
  detailSurveyForm,
  surveyFormReportList
} from '../../controllers/v1/survey-forms.controller';

function surveyFormsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/survey_forms',
    schema: addSurveyFormRouterOpts,
    preHandler: canAdd,
    handler: addSurveyForm,
  });
  fastify.route({
    method: 'GET',
    url: '/v1/survey_forms',
    schema: listSurveyFormRouterOpts,
    preHandler: canView,
    handler: list,
  });
  fastify.route({
    method: 'PUT',
    url: '/v1/survey_forms/:id',
    schema: updateSurveyFormRouterOpts,
    preHandler: canUpdate,
    handler: updateSurveyForm,
  });
  fastify.route({
    method: 'GET',
    url: '/v1/survey_forms/:id',
    schema: detailSurveyFormRouterOpts,
    preHandler: canView,
    handler: detailSurveyForm,
  });
  fastify.route({
    method: 'GET',
    url: '/v1/survey_forms/:id/reports',
    schema: surveyFormReportRouterOpts,
    preHandler: canViewReportList,
    handler: surveyFormReportList,
  });
  fastify.route({
    method: 'GET',
    url: '/v1/survey_forms/current',
    schema: listCurrentSurveyFormRouterOpts,
    preHandler: canView,
    handler: listCurrent,
  });
  next();
}

export default surveyFormsPrivateRoutes;
