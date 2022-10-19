import { FastifyInstance } from 'fastify';
import canViewFlightStatus from '../../hooks/flight-status-policy.hooks';
import flightDetailRouterOpts from './flight-status-detail-router-option';
import flightStatusListRouterOpts from './flight-status-list-router-option';

import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  list,
  flightStatusDetail
} from '../../controllers/v1/flight-status.controller';

function flightStatusPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'GET',
    url: '/v1/flight_status',
    preHandler: canViewFlightStatus,
    schema: flightStatusListRouterOpts,
    handler: list
  });
  fastify.route({
    method: 'GET',
    url: '/v1/flight_status/:id',
    preHandler: canViewFlightStatus,
    schema: flightDetailRouterOpts,
    handler: flightStatusDetail
  });
  next();
}
export default flightStatusPrivateRoutes;
