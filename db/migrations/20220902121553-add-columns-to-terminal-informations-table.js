'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('terminal_informations', 'created_by', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        key: 'id',
        model: 'users'
      }
    });
    await queryInterface.addColumn('terminal_informations', 'updated_by', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        key: 'id',
        model: 'users'
      }
    });
  },

  down: (queryInterface, Sequelize) => Promise.resolve()
};
