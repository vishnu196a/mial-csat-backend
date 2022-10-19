import invitationListRouterOpts from './survey-form-invitations-list-router-option';
import invitationResendRouterOpts from './survey-form-invitations-resent-router-option';
import invitationDetailRouterOpts from './survey-form-invitations-detail-router-option';

import { FastifyInstance } from 'fastify';
import { canView, canResend } from '../../hooks/survey-form-invitation-policy.hooks';
import { list, detail, resend } from '../../controllers/v1/survey-form-invitations.controller';
import { Server, ServerResponse, IncomingMessage } from 'http';

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
    method: 'PUT',
    url: '/v1/surveys/resend/:id',
    schema: invitationResendRouterOpts,
    preHandler: canResend,
    handler: resend
  });

  next();
}

export default surveyFormInvitationsPrivateRoutes;
