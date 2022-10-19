import { Role, User, CallEntry, DownloadQueue } from '../../models';

function defineScopeAndAssociation() {
  User.belongsTo(Role, {
    as: 'role',
    foreignKey: 'role_id'
  });
  User.hasMany(CallEntry, {
    as: 'call_entry',
    foreignKey: 'abandoned_call_updated_by'
  });
  User.hasMany(DownloadQueue, {
    as: 'download_queue',
    foreignKey: 'user_id'
  });
}

export default defineScopeAndAssociation;
