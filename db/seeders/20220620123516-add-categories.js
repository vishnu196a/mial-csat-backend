'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Airport Services/Facilities',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Airline Information',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Flight Information',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Immigrations',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Customs',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'CISF',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Miscellaneous',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'City information',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Feedback',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Emergency',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null);
  },
};
