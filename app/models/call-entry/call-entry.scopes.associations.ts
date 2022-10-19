import { User, CallTag, CallEntry, QueueCallEntry } from '..';

function defineScopeAndAssociation() {
  CallEntry.hasMany(CallTag, {
    as: 'call_tag',
    foreignKey: 'call_entry_id'
  });
  CallEntry.belongsTo(User, {
    as: 'user',
    foreignKey: 'abandoned_call_updated_by'
  });

  CallEntry.hasOne(CallTag, {
    as: 'call_tags',
    foreignKey: 'call_entry_id'
  });

  CallEntry.belongsTo(QueueCallEntry, {
    as: 'queue_call_entry',
    foreignKey: 'id_queue_call_entry'
  });
}

export default defineScopeAndAssociation;
