import logger from '../config/logger';

import { verify as jwtVerify } from 'jsonwebtoken';
import { JwtTokenIVRAttributes } from '../types';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

const {
  IVR_USER_NAME = '',
  JWT_SECRET_KEY_FOR_IVR = '',
  JWT_SECRET_KEY_FOR_TEMP_SSO_TOKEN = ''
} = process.env;

function getHeaderToken(headers: any) {
  const bearerHeader = headers.authorization;
  const bearer = bearerHeader ? bearerHeader.split(' ') : [];
  const bearerToken = bearer[1];
  return bearerToken;
}

function verifyToken(
  token: string,
  secretKey: string
): Promise<JwtTokenIVRAttributes> {
  return new Promise((resolve, reject) =>
    jwtVerify(
      token,
      secretKey,
      (err: string, decoded: JwtTokenIVRAttributes) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    )
  );
}

const ivrAuthHook = (fastify: FastifyInstance) => {
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
          const ivrUserAttrs = await verifyToken(
            token, JWT_SECRET_KEY_FOR_IVR
          );
          if (!(
            ivrUserAttrs
              && (
                ivrUserAttrs.name === IVR_USER_NAME
                )
            )) {
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

const ivrLoginAuthHook = (fastify: FastifyInstance) => {
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
          const ivrUserAttrs = await verifyToken(
            token, JWT_SECRET_KEY_FOR_TEMP_SSO_TOKEN
          );
          if (!ivrUserAttrs) {
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
export { ivrAuthHook, ivrLoginAuthHook };
