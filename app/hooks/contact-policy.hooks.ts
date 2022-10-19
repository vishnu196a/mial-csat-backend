import ContactPolicy from '../policies/contact.policy';

import { FastifyReply, FastifyRequest } from 'fastify';

const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ContactPolicy(req.currentUser);
  if (!(await policy.canAdd())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ContactPolicy(req.currentUser);
  if (!(await policy.canUpdate())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ContactPolicy(req.currentUser);
  if (!(await policy.canDelete())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

export { canAdd, canUpdate, canDelete };
