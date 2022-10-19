import CallTagPolicy from '../policies/call-tag.policy';
import { FastifyReply, FastifyRequest } from 'fastify';

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new CallTagPolicy(req.currentUser);
  if (!(await policy.canUpdate())) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new CallTagPolicy(req.currentUser);
  if (!(await policy.canDelete())) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export { canDelete, canUpdate };
