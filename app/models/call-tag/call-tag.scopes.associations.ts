import { CallTag, CallEntry, User, Category, SubCategory, Terminal } from '..';

function defineScopeAndAssociation() {
  CallTag.belongsTo(CallEntry, {
    as: 'call_entry',
    foreignKey: 'call_entry_id'
  });
  CallTag.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
  CallTag.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id'
  });
  CallTag.belongsTo(SubCategory, {
    as: 'sub_category',
    foreignKey: 'sub_category_id'
  });
  CallTag.belongsTo(Terminal, {
    as: 'terminal',
    foreignKey: 'terminal_id'
  });
}

export default defineScopeAndAssociation;
