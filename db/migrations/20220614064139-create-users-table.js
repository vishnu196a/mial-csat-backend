'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface
      .createTable('users', {
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
        mobile_no: {
          type: Sequelize.STRING(15),
          allowNull: true
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        employee_number: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        agent_code: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        encrypted_password: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        access_token: {
          type: Sequelize.TEXT
        },
        invited_by: {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        role_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id'
          }
        },
        sign_in_count: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        last_sign_in_ip: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        last_sign_in_at: {
          type: Sequelize.DATE,
          allowNull: true
        },
        current_sign_in_ip: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        current_sign_in_at: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        confirmed_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      })
      .then(() =>
        queryInterface.addIndex('users', [
          'email',
          'role_id',
          'invited_by'
        ])
      ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
