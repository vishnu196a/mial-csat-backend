'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('call_tags', 'message'),

  down: (queryInterface, Sequelize) => Promise.resolve()
};
