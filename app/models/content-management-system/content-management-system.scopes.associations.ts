import { User, Category, SubCategory, ContentManagementSystem } from '..';

function defineScopeAndAssociation() {
  ContentManagementSystem.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by'
  });
}

export default defineScopeAndAssociation;
