'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn('contacts', 'phone', {
    type: Sequelize.STRING(15),
    allowNull: true
  }),

  down: (queryInterface, Sequelize) => Promise.resolve()
};
