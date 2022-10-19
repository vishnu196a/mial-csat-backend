'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('call_tags', 'caller_name', {
    type: Sequelize.STRING(100),
    allowNull: true
  }),

  down: (queryInterface, Sequelize) => Promise.resolve()
};
