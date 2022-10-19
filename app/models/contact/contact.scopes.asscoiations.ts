import {
  User,
  Contact,
  Terminal,
  Category,
  SubCategory,
} from '../../models';

function defineScopeAndAssociation() {
  Contact.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
  Contact.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id'
  });
  Contact.belongsTo(SubCategory, {
    as: 'sub_category',
    foreignKey: 'sub_category_id'
  });
  Contact.belongsTo(Terminal, {
    as: 'terminal',
    foreignKey: 'terminal_id'
  });
}

export default defineScopeAndAssociation;
