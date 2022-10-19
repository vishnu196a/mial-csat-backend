'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('business_enquiry_emails', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING
    },
    phone_no: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customer_email_id: {
      type: Sequelize.STRING
    },
    email_id: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('business_enquiry_emails')
};
