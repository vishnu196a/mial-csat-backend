import { Agent } from '../models';
import { EmptyResultError } from 'sequelize';

async function getById(id: number) {
  const agent = await Agent.findByPk(id);
  if (!agent) throw new EmptyResultError('Agent not found');

  return agent;
}

function getAnAent(attrs) {
  return Agent.findOne(attrs);
}

export { getById, getAnAent };
