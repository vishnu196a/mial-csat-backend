'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('download_queues', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(
          'Done',
          'Failed',
          'Pending',
          'In Progress'
        ),
        allowNull: false
      },
      payload: {
        type: Sequelize.JSON,
        allowNull: false
      },
      report_download_path: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      retry_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      error: {
        type: Sequelize.JSON
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
        type: Sequelize.DATE
      },
    }).then(() =>
    queryInterface.addIndex('download_queues', [
      'status',
      'user_id'
    ])),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('download_queues')
};
