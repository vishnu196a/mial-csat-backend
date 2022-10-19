'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('email_templates', [
      {
        name: 'Threat Call',
        category_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
        sub_category_id: 196
      },
      {
        name: 'Fire',
        category_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
        sub_category_id: 197
      },
      {
        name: 'Threat Call',
        category_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
        sub_category_id: 198
      },
      {
        name: 'Medical Emergency',
        category_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
        sub_category_id: 199
      },
      {
        name: 'Suspicious Activity',
        category_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
        sub_category_id: 200
      },
      {
        name: 'Suspicious Activity',
        category_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
        sub_category_id: 201
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('email_templates', null);
  }
};
