import invitationListRouterOpts from './survey-form-invitations-list-router-option';
import getSurveyFormInvitationRouterOpts from './survey-form-invitations-resent-router-option';
import invitationDetailRouterOpts from './survey-form-invitations-detail-router-option';
import updateSurveyFormInvitationRouterOpts from './survey-form-invitations-update-router-option';

import { FastifyInstance } from 'fastify';
import { canView, canResend } from '../../hooks/survey-form-invitation-policy.hooks';
import { Server, ServerResponse, IncomingMessage } from 'http';

import {
  list,
  detail,
  getSurveyFormInvitation,
  updateSurveyFormInvitation
} from '../../controllers/v1/survey-form-invitations.controller';

function surveyFormInvitationsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/surveys/invitation_list',
    schema: invitationListRouterOpts,
    preHandler: canView,
    handler: list
  });

  fastify.route({
    method: 'GET',
    url: '/v1/surveys/detail/:id',
    schema: invitationDetailRouterOpts,
    preHandler: canView,
    handler: detail
  });

  fastify.route({
    method: 'GET',
    url: '/v1/surveys/invitation/:id',
    schema: getSurveyFormInvitationRouterOpts,
    preHandler: canView,
    handler: getSurveyFormInvitation
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/surveys/invitation/:id',
    schema: updateSurveyFormInvitationRouterOpts,
    preHandler: canResend,
    handler: updateSurveyFormInvitation
  });

  next();
}

export default surveyFormInvitationsPrivateRoutes;
