import TerminalInformationPolicy from '../policies/terminal-information.policy';

import { FastifyReply, FastifyRequest } from 'fastify';
const canAdd = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalInformationPolicy(req.currentUser);
  if (!(await policy.canAdd())) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canView = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalInformationPolicy(req.currentUser);
  if (!(await policy.canView())) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canUpdate = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalInformationPolicy(req.currentUser);
  if (!(await policy.canUpdate())) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

const canDelete = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new TerminalInformationPolicy(req.currentUser);
  if (!(await policy.canDelete())) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

export { canAdd, canView, canUpdate, canDelete };
