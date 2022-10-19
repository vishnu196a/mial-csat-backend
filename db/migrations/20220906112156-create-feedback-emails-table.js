'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('feedback_emails', {
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
    responded: {
      type: Sequelize.TEXT
    },
    mail_to_feedback_team: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    flight_info: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date_of_journey: {
      type: Sequelize.DATE,
      allowNull: false
    },
    email_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    caller_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    feedback: {
      type: Sequelize.STRING,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('feedback_emails')
};
