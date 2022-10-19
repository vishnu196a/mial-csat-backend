'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface
      .createTable('terminal_informations', {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        terminal_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'terminals',
            key: 'id'
          }
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false
        },
        shop_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT
        },
        phone: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
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
          type: Sequelize.DATE,
          allowNull: true
        }
      }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('terminal_informations')
};
