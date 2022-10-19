import { User, CallEntry, BusinessEnquiryEmail } from '..';

function defineScopeAndAssociation() {
  BusinessEnquiryEmail.belongsTo(CallEntry, {
    as: 'call_entry',
    foreignKey: 'call_entry_id'
  });
  BusinessEnquiryEmail.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
}

export default defineScopeAndAssociation;
