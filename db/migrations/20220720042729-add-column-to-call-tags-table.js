'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('call_tags', 'caller_name', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.addColumn('call_tags', 'location', {
      type: Sequelize.STRING(100),
      allowNull: false
    });
    await queryInterface.addColumn('call_tags', 'message', {
      type: Sequelize.TEXT
    });
    await queryInterface.addColumn('call_tags', 'contact_number', {
      type: Sequelize.STRING(15)
    });
    await queryInterface.addColumn('call_tags', 'terminal_id', {
      type: Sequelize.BIGINT,
      references: {
        key: 'id',
        model: 'terminals'
      }
    });
  },

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('call_tags', 'terminal_id')
};
