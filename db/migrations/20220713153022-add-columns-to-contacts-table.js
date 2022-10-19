'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('contacts', 'terminal_id', {
      type: Sequelize.BIGINT,
      references: {
        key: 'id',
        model: 'terminals'
      }
    });
  },

  down: (queryInterface, Sequelize) => Promise.resolve()
};
