import { Role, User } from '../../models';

function defineScopeAndAssociation() {
  User.belongsTo(Role, {
    as: 'role',
    foreignKey: 'role_id'
  });
}

export default defineScopeAndAssociation;
