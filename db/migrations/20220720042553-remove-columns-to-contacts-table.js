'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.resolve(),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('contacts', 'terminal_id')
};
