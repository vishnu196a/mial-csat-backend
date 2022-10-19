import UserPolicy from '../policies/user.policy';
import { getUserById } from '../services/user.service';
import { FastifyReply, FastifyRequest } from 'fastify';

const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new UserPolicy(req.currentUser);
  if (!await policy.canAdd()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new UserPolicy(req.currentUser);
  if (!await policy.canView()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canViewDetail = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new UserPolicy(req.currentUser);
  if (!await policy.canViewDetail()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new UserPolicy(req.currentUser);
  if (!await policy.canUpdate()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: number };
  const user = await getUserById(id);
  const policy = new UserPolicy(req.currentUser);
  if (!await policy.canDelete(user)) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export {
  canAdd,
  canView,
  canUpdate,
  canDelete,
  canViewDetail
};
