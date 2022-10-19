'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Rafael',
        email: 'r.ragul@yavar.in',
        employee_number: '11111111',
        agent_code: '11111',
        role_id: 1,
        encrypted_password: bcrypt.hashSync('12345678', 10),
        confirmed_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sundhar',
        email: 'sundharwinston@yavar.in',
        employee_number: '22222222',
        agent_code: '22222',
        role_id: 2,
        encrypted_password: bcrypt.hashSync('12345678', 10),
        confirmed_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bennison',
        email: 'bennison@yavar.in',
        employee_number: '33333333',
        agent_code: '33333',
        role_id: 2,
        encrypted_password: bcrypt.hashSync('12345678', 10),
        confirmed_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null);
  }
};
