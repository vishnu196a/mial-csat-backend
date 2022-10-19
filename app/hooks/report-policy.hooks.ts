import ReportPolicy from '../policies/report.policy';
import { FastifyReply, FastifyRequest } from 'fastify';

const canViewCategoryList = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canViewCategoryList()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canViewCategoryChart = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canViewCategoryChart()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canViewSubCategoryList = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canViewSubCategoryList()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canViewSubCategoryChart = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canViewSubCategoryChart()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canViewTopThreeSubCategoryList = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canViewTopThreeSubCategoryList()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canDownloadCategorReport = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canDownloadCategoryReport()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

const canDownloadSubCategoryReport = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new ReportPolicy(req.currentUser);
  if (!await policy.canDownloadSubCategoryReport()) {
    reply.code(403).send({ errors: ['You are not allowed to performance this action'] });
  }
};

export {
  canViewCategoryList,
  canViewCategoryChart,
  canViewSubCategoryList,
  canViewSubCategoryChart,
  canDownloadCategorReport,
  canDownloadSubCategoryReport,
  canViewTopThreeSubCategoryList
};
