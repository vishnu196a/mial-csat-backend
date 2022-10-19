import { Role, User } from '..';

function defineScopeAndAssociation() {
  Role.hasMany(User, {
    as: 'user',
    foreignKey: 'role_id'
  });
}

export default defineScopeAndAssociation;
