'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('request_emails', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING
    },
    date_of_birth: {
      type: Sequelize.DATEONLY
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    postal_code: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    mobile_no: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telephone: {
      type: Sequelize.STRING
    },
    mail_to_feedback_team: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    email: {
      type: Sequelize.STRING
    },
    nationality: {
      type: Sequelize.STRING
    },
    passport_number: {
      type: Sequelize.STRING
    },
    place_of_make: {
      type: Sequelize.STRING
    },
    port_of_destination: {
      type: Sequelize.STRING
    },
    date_of_issue: {
      type: Sequelize.DATE,
    },
    contact_person_email_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    meet_and_assist: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('request_emails')
};
