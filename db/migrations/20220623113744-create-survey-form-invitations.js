'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('survey_form_invitations', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      survey_form_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'survey_forms',
          key: 'id',
        },
      },
      call_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(
          'Email','SMS'
        ),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(100)
      },
      contact: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      invitation_url: {
        type: Sequelize.TEXT
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
      }
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('survey_form_invitations'),
};
