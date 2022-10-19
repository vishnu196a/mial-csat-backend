import SurveyFromInvitationPolicy from '../policies/survey-form-invitation.policy';
import { FastifyReply, FastifyRequest } from 'fastify';

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFromInvitationPolicy(req.currentUser);
  if (!(await policy.canView())) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canResend = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new SurveyFromInvitationPolicy(req.currentUser);
  if (!(await policy.canResend())) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export { canView, canResend };
