import TerminalPolicy from '../policies/terminal.policy';

import { FastifyReply, FastifyRequest } from 'fastify';

const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalPolicy(req.currentUser);
  if (!(await policy.canAdd())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalPolicy(req.currentUser);
  if (!(await policy.canView())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canViewDetail = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalPolicy(req.currentUser);
  if (!(await policy.canViewDetail())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalPolicy(req.currentUser);
  if (!(await policy.canUpdate())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalPolicy(req.currentUser);
  if (!(await policy.canDelete())) {
    reply.code(403).send({ errors: ['You are not allowed to perform this action'] });
  }
};

export {
  canAdd,
  canView,
  canUpdate,
  canDelete,
  canViewDetail
};
