import { User, CallEntry, FeedbackEmail } from '..';

function defineScopeAndAssociation() {
  FeedbackEmail.belongsTo(CallEntry, {
    as: 'call_entry',
    foreignKey: 'call_entry_id'
  });
  FeedbackEmail.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
}

export default defineScopeAndAssociation;
