'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
   queryInterface.createTable('terminals', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
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
    })
      .then(() => queryInterface.addIndex('terminals', ['name'])),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('terminals')
};
