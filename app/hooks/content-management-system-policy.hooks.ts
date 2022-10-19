import { FastifyReply, FastifyRequest } from 'fastify';
import ContentManagementSystemPolicy from '../policies/content-management-system.policy';

const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ContentManagementSystemPolicy(req.currentUser);
  if (!await policy.canAdd()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ContentManagementSystemPolicy(req.currentUser);
  if (!await policy.canUpdate()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ContentManagementSystemPolicy(req.currentUser);
  if (!await policy.canDelete()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export { canAdd, canUpdate, canDelete };
