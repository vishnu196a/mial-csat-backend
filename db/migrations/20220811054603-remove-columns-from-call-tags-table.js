'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('call_tags', 'location'),

  down: (queryInterface, Sequelize) => Promise.resolve()
};
