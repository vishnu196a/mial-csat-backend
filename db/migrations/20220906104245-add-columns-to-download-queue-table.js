'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  queryInterface.addColumn('download_queues', 'type', {
      type: Sequelize.ENUM(
        'Static',
        'Dynamic'
      ),
      defaultValue: 'Dynamic'
    }),

  down: (queryInterface, Sequelize) => Promise.resolve()
};
