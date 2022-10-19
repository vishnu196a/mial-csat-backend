import { User, DownloadQueue } from '..';

function defineScopeAndAssociation() {
  DownloadQueue.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  });
}

export default defineScopeAndAssociation;
