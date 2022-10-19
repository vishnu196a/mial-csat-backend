import { EmptyResultError } from 'sequelize';
import { QueueCallEntry } from '../models';

function listAllQueueCallEntry() {
  return QueueCallEntry.findAll({ attributes: ['id', 'description'] });
}

async function getById(id: number) {
  const queueCallEntry = await QueueCallEntry.findByPk(id);
  if (!queueCallEntry) throw new EmptyResultError('Language not found');

  return queueCallEntry;
}

export { getById, listAllQueueCallEntry };
