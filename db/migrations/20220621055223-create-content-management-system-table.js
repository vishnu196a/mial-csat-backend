'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface
      .createTable('content_management_system', {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM(
            'Excel', 'Free Text'
          ),
          allowNull: false
        },
        created_by: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            key: 'id',
            model: 'users'
          }
        },
        category_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            key: 'id',
            model: 'categories'
          }
        },
        sub_category_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            key: 'id',
            model: 'sub_categories'
          }
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('content_management_system')
};
