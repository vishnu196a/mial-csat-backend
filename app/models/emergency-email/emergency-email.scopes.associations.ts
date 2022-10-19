import { User, CallEntry, EmergencyEmail } from '..';

function defineScopeAndAssociation() {
  EmergencyEmail.belongsTo(CallEntry, {
    as: 'call_entry',
    foreignKey: 'call_entry_id'
  });
  EmergencyEmail.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
}

export default defineScopeAndAssociation;
