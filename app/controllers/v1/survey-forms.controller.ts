import activityLogger from '../../config/activity-logger';

import { ValidationError } from 'sequelize';
import { SurveyFormListQueryParams } from '../../types';

import {
  AddSurveyFormParams,
  SurveyFormReportListQueryParams
} from '../../types/survey-forms.contreller';
import {
  FastifyError,
  FastifyReply,
  FastifyRequest
} from 'fastify';
import {
  add,
  update,
  detail,
  reportList,
  filterAndPaginate,
  getSurveyFormById,
  getCurrentSurveyFormNamesAndIds,
} from '../../services/survey-form.service';

function addSurveyForm(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddSurveyFormParams;
  const currentUser = req.currentUser;
  add(params, currentUser)
    .then((surveyForm) => {
      activityLogger.log(currentUser, surveyForm, 'survey form', 'created');
      reply.code(201).send(surveyForm);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      }
      reply.code(422).send({ errors: [error.message] });
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as SurveyFormListQueryParams;
  filterAndPaginate(query)
    .then((surveyForms) => {
      reply.code(200).send(surveyForms);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateSurveyForm(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const currentUser = req.currentUser;
  getSurveyFormById(id)
    .then(() => {
      update(id, currentUser)
        .then((surveyForm) => {
          activityLogger.log(currentUser, surveyForm, 'survey form', 'updated');
          reply.code(200).send(surveyForm);
        })
        .catch((error) => {
          reply.send(error);
        });
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      }
      reply.code(422).send({ errors: [error.message] });
    });
}

function detailSurveyForm(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((surveyForm) => {
      reply.code(200).send(surveyForm);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      }
      reply.code(422).send({ errors: [error.message] });
    });
}

function listCurrent(req: FastifyRequest, reply: FastifyReply) {
  getCurrentSurveyFormNamesAndIds()
    .then((surveyForm) => {
      reply.code(200).send([surveyForm]);
    })
    .catch((error) => {
      reply.send(error);
    });
}

function surveyFormReportList(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const query = req.query as SurveyFormReportListQueryParams;
  getSurveyFormById(id)
    .then(() => {
      reportList(id, query)
        .then((surveyFormReports) => {
          reply.code(200).send(surveyFormReports);
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            reply.send(error);
          }
          reply.code(422).send({ errors: [error.message] });
        });
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      }
      reply.code(422).send({ errors: [error.message] });
    });
}

export {
  list,
  listCurrent,
  addSurveyForm,
  updateSurveyForm,
  detailSurveyForm,
  surveyFormReportList
};
