import logger from '../../config/logger';
import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';
import { add, detail, filterAndPaginate } from '../../services/survey-form-response.service';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddSurveyFormResponseParams,
  SurveyFormResponseListQueryParams
} from '../../types/survey-form-responses.controller';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as SurveyFormResponseListQueryParams;
  filterAndPaginate(query)
    .then((surveyFormResponses) => {
      reply.code(200).send(surveyFormResponses);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailSurveyFormResponse(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((surveyFormResponse) => {
      reply.code(200).send(surveyFormResponse);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function addSurveyFormResponse(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddSurveyFormResponseParams;
  add(params)
    .then((surveyFormResponse) => {
      logger.info({
        surveyFormResponse, msg: 'survey form response created successfully'
      });
      reply.code(201).send(surveyFormResponse);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

export { list, detailSurveyFormResponse, addSurveyFormResponse };
