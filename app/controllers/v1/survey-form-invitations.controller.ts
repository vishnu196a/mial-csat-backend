import { EmptyResultError, ValidationError } from 'sequelize';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  update,
  createInvitation,
  getInvitationById,
  filterAndPaginate,
  getActiveSurveyForm,
  verifyAndSendInvitationForm,
  surveyFormInvitationDetail
} from '../../services/survey-form-invitation.service';

import {
  SurveyFormInvitationParams,
  SurveyFormInvitationCreateParams,
  SurveyFormInvitationListQueryParams
} from '../../types';

function sendInvitationForm(req: FastifyRequest, reply: FastifyReply) {
  const { t: token } = req.query as { t: string };
  verifyAndSendInvitationForm(token)
    .then((surveyInvitation) => {
      reply.code(200).send(surveyInvitation);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as SurveyFormInvitationListQueryParams;
  filterAndPaginate(query)
    .then((invitation) => {
      reply.code(200).send(invitation);
    })
    .catch((err) => {
      reply.send(err);
    });
}

function detail(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  surveyFormInvitationDetail(id)
    .then((surveyInvitation) => {
      reply.code(200).send(surveyInvitation);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function activeSurveyForm(req: FastifyRequest, reply: FastifyReply) {
  const queryParams = req.query as SurveyFormInvitationParams;
  getActiveSurveyForm(queryParams)
    .then((SurveyForm) => {
      reply.code(200).send(SurveyForm);
    })
    .catch((error) => {
      if (error instanceof ValidationError || error instanceof EmptyResultError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function createSurveyFormInvitation(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as SurveyFormInvitationCreateParams;
  createInvitation(params)
    .then(() => {
      reply.code(201).send({
        message: 'The survey form invitation has been sent to mobile'
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function getSurveyFormInvitation(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  getInvitationById(id)
    .then((surveyFormInvitation) => {
      reply.code(200).send(surveyFormInvitation);
    })
    .catch((error) => {
      reply.send(error);
    });
}

function updateSurveyFormInvitation(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const currentUser = req.currentUser;
  update(id, currentUser)
    .then(() => {
      reply.code(200).send({
        message: 'The survey form invitation has been resent'
      });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  list,
  detail,
  getSurveyFormInvitation,
  activeSurveyForm,
  updateSurveyFormInvitation,
  sendInvitationForm,
  createSurveyFormInvitation
};
