'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('survey_form_responses', 'score', {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0
    });
    await queryInterface.addColumn('survey_form_responses', 'report', {
      type: Sequelize.JSON
    });
  },

  down: (queryInterface, Sequelize) => Promise.resolve()
};
