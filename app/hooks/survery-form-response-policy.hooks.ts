import SurveyFormResponsePolicy from '../policies/survey-form-response.policy';

import { FastifyReply, FastifyRequest } from 'fastify';

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFormResponsePolicy(req.currentUser);
  if (!await policy.canView()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canViewDetail = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFormResponsePolicy(req.currentUser);
  if (!await policy.canViewDetail()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export { canView, canViewDetail };
