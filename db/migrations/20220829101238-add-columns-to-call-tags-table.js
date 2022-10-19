'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('call_tags', 'mode', {
      type: Sequelize.ENUM(
        'Query',
        'Request',
        'Feedback',
        'Emergency'
      ),
      allowNull: false
    });
    await queryInterface.addColumn('call_tags', 'caller_address', {
      type: Sequelize.TEXT
    });
    await queryInterface.addColumn('call_tags', 'caller_email_id', {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => Promise.resolve()
};
