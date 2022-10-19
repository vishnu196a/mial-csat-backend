'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('content_management_system', 'category_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        key: 'id',
        model: 'categories'
      }
    }),
    await queryInterface.changeColumn('content_management_system', 'sub_category_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        key: 'id',
        model: 'sub_categories'
      }
    })
    await queryInterface.changeColumn('content_management_system', 'type', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => Promise.all()
};
