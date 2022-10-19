import { ManagerReport, User } from '..';

function defineScopeAndAssociation() {
  ManagerReport.belongsTo(User, {
    as: 'user',
    foreignKey: 'created_by',
  });
}

export default defineScopeAndAssociation;
