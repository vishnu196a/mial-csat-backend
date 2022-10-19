'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          key: 'id',
          model: 'categories',
        },
      },
      sub_category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          key: 'id',
          model: 'sub_categories',
        },
      },
      created_by: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          key: 'id',
          model: 'users',
        },
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
      },
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('contacts'),
};
