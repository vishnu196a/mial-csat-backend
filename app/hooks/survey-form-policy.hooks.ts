import { FastifyReply, FastifyRequest } from 'fastify';

import SurveyFormPolicy from '../policies/survey-form.policy';

const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFormPolicy(req.currentUser);
  if (!(await policy.canAdd())) {
    reply.code(403).send({ errors: ['you are not allowed to perform this action'] });
  }
};

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFormPolicy(req.currentUser);
  if (!(await policy.canView())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canViewReportList = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFormPolicy(req.currentUser);
  if (!(await policy.canViewReportList())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFormPolicy(req.currentUser);
  if (!(await policy.canUpdate())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};
export { canAdd, canView, canUpdate, canViewReportList };
