'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('call_entry', 'abandoned_call_updated_by', {
      type: Sequelize.BIGINT,
      references: {
        key: 'id',
        model: 'users'
      }
    });
  },

  down: async (queryInterface, Sequelize) => Promise.resolve()
};
