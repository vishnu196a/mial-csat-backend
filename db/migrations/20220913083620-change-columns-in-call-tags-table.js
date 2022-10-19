'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('call_tags', 'mode', {
      type: Sequelize.ENUM(
        'Query',
        'Request',
        'Feedback',
        'Emergency',
        'Business Enquiry'
      ),
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => Promise.all()
};
