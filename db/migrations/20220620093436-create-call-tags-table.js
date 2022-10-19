'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('call_tags', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      call_entry_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sub_category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          key: 'id',
          model: 'sub_categories'
        }
      },
      created_by: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          key: 'id',
          model: 'users'
        },
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('call_tags'),
};
