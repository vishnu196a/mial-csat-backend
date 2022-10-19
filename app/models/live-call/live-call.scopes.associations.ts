import { LiveCallEntry, QueueCallEntry } from '..';

function defineScopeAndAssociation() {
  LiveCallEntry.belongsTo(QueueCallEntry, {
    as: 'queue_call_entry',
    foreignKey: 'id_queue_call_entry'
  });
}

export default defineScopeAndAssociation;
