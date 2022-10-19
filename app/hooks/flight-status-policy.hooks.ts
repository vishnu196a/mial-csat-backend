import { FastifyReply, FastifyRequest } from 'fastify';
import FlightStatusPolicy from '../policies/flight-status.policy';

const canViewFlightStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const policy = new FlightStatusPolicy(req.currentUser);
  if (!policy.canView()) {
    reply.status(403).send({ error: ['You are not allowed to performance this action'] });
  }
};
export default canViewFlightStatus;
