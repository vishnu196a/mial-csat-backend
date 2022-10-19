'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('survey_form_responses', {
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
          key: 'id',
          model: 'survey_forms'
        },
      },
      survey_form_invitation_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          key: 'id',
          model: 'survey_form_invitations'
        }
      },
      responses: {
        type: Sequelize.JSON,
        allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('survey_form_responses'),
};
