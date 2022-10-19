'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'call_tags', 'category_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        key: 'id',
        model: 'categories'
      }
    }),

  down: async (queryInterface, Sequelize) => Promise.resolve()
};
