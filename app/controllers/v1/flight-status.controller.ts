import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { filterAndPaginate, getFlightStatusById } from '../../services/flight-status.service';
import { FlightStatusListQueryParams } from '../../types/flight-status.controller';

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as FlightStatusListQueryParams;
  filterAndPaginate(query)
    .then((flightStatus) => {
      reply.code(200).send(flightStatus);
    })
    .catch((err) => {
      reply.send(err);
    });
}

function flightStatusDetail(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  getFlightStatusById(id)
    .then((flightStatus) => {
      reply.code(200).send(flightStatus);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export {
  list,
  flightStatusDetail
};
