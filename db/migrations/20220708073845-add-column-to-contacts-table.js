'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('contacts', 'landline_number', {
    type: Sequelize.STRING(15),
  }),

  down: (queryInterface, Sequelize) => Promise.resolve()
};
