'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn('content_management_system', 'content', {
    type: Sequelize.TEXT('long'),
    allowNull: false
  }),

  down: (queryInterface, Sequelize) => Promise.resolve()

};
