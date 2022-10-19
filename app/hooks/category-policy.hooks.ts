import { FastifyReply, FastifyRequest } from 'fastify';
import CategoryPolicy from '../policies/category.policy';

const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new CategoryPolicy(req.currentUser);
  if (!await policy.canAdd()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new CategoryPolicy(req.currentUser);
  if (!await policy.canView()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new CategoryPolicy(req.currentUser);
  if (!await policy.caUpdate()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new CategoryPolicy(req.currentUser);
  if (!await policy.canDelete()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export { canAdd, canView, canUpdate, canDelete };
