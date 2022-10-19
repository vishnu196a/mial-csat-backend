import { User, CallEntry, RequestEmail } from '..';

function defineScopeAndAssociation() {
  RequestEmail.belongsTo(CallEntry, {
    as: 'call_entry',
    foreignKey: 'call_entry_id'
  });
  RequestEmail.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
}

export default defineScopeAndAssociation;
