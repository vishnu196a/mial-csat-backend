'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('survey_form_invitations','resent_at', {
      type: Sequelize.DATE,
    });
    queryInterface.addColumn('survey_form_invitations', 'resent_by_id', {
      type: Sequelize.BIGINT,
      references: {
        key: 'id',
        model: 'users'
      }
    });
  },

  down: (queryInterface, Sequelize) => Promise.resolve()
};
