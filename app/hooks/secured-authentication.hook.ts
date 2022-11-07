import logger from '../config/logger';

import { verify as jwtVerify } from 'jsonwebtoken';
import { JwtTokenCRMAttributes } from '../types';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

const { JWT_SECRET_KEY_FOR_CSAT = '' } = process.env;

function getHeaderToken(headers: any) {
  const bearerHeader = headers.authorization;
  const bearer = bearerHeader ? bearerHeader.split(' ') : [];
  const bearerToken = bearer[1];
  return bearerToken;
}

function verifyToken(
  token: string,
  secretKey: string
): Promise<JwtTokenCRMAttributes> {
  return new Promise((resolve, reject) =>
    jwtVerify(
      token,
      secretKey,
      (err: string, decoded: JwtTokenCRMAttributes) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    )
  );
}

const securedAuthenticate = (fastify: FastifyInstance) => {
  fastify.decorateRequest('currentUser', null);
  fastify.addHook(
    'preHandler',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = getHeaderToken(req.headers);
      if (!token) {
        const error = {
          errors: ['You need to sign-in to access this page']
        };
        reply.code(401).send(error);
      } else {
        try {
          const crmUserAttrs = await verifyToken(
            token, JWT_SECRET_KEY_FOR_CSAT
          );
          if (!crmUserAttrs) {
            const error = {
              errors: ['Session has expired']
            };
            reply.code(401).send(error);
          }
        } catch (error: any) {
          logger.error({ err: error }, error.toString());
          reply.code(401).send({ errors: ['Session has expired'] });
        }
      }
    }
  );
};
export default securedAuthenticate;
