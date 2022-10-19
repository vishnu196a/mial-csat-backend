'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('email_templates',
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        key: 'id',
        model: 'categories'
      }
    },
    sub_category_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        key: 'id',
        model: 'sub_categories'
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
    },
  }).then(() => {
    queryInterface.addIndex('email_templates', [
      'name'
    ])
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('email_templates')
};
