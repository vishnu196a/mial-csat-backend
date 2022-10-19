'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('emergency_emails', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    department: {
      type: Sequelize.STRING
    },
    contact_person: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone_no: {
      type: Sequelize.STRING
    },
    email_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false
    },
    call_entry_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_by: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
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
      type: Sequelize.DATE
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('emergency_emails')
};
