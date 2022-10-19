'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('survey_form_invitations', 'user_id', {
      type: Sequelize.BIGINT,
      references: {
        key: 'id',
        model: 'users'
      }
    });
  },

  down: (queryInterface, Sequelize) => Promise.resolve()
};
