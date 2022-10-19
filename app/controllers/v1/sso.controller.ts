import { ValidationError } from 'sequelize';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  markSSOLogout,
  validateAndMarkLogin,
  validateAndGetSSOUrl
} from '../../services/sso.service';

function getSSOUrl(req: FastifyRequest, reply: FastifyReply) {
  const { agent_code: agentCode } = req.body as { agent_code: string };
  validateAndGetSSOUrl(agentCode)
    .then((ssoUrl) => {
      reply.code(200).send(ssoUrl);
    })
    .catch((error) => {
      reply.send(error);
    });
}

function ssoLogin(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization || '';
  const ipaddress = req.ip;
  validateAndMarkLogin(token, ipaddress)
    .then((user) => {
      reply.header('Authorization', `Bearer ${user.access_token}`);
      reply.code(200).send(user);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function ssoLogout(req: FastifyRequest, reply: FastifyReply) {
  const { agent_code: agentCode } = req.body as { agent_code: string };
  markSSOLogout(agentCode)
    .then(() => {
      reply.header('Authorization', null);
      reply.code(200).send({ message: 'SSO Successfully logged out' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export { ssoLogin, ssoLogout, getSSOUrl };
