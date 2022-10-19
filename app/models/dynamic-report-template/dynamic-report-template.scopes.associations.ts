import { DynamicReportTemplate, User } from '..';

function defineScopeAndAssociation() {
  DynamicReportTemplate.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by',
  });
}

export default defineScopeAndAssociation;
