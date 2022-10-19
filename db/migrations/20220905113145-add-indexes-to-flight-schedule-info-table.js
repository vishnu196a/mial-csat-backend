'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('flight_schedule_info', ['gate_name'], {
      name: 'idx16_flight_schedule_info'
    });
    await queryInterface.addIndex('flight_schedule_info', ['deleted_dt'], {
      name: 'idx17_flight_schedule_info'
    });
    await queryInterface.addIndex('flight_schedule_info', ['updated_dt'], {
      name: 'idx18_flight_schedule_info'
    });
    await queryInterface.addIndex('flight_schedule_info', ['boarding_time'], {
      name: 'idx19_flight_schedule_info'
    });
    await queryInterface.addIndex(
      'flight_schedule_info',
      ['service_type_desc'],
      {
        name: 'idx20_flight_schedule_info'
      }
    );
    await queryInterface.addIndex(
      'flight_schedule_info',
      ['arrival_airport_name'],
      {
        name: 'idx21_flight_schedule_info'
      }
    );
    await queryInterface.addIndex(
      'flight_schedule_info',
      ['departure_airport_name'],
      {
        name: 'idx22_flight_schedule_info'
      }
    );
    await queryInterface.addIndex(
      'flight_schedule_info',
      ['operational_status_description'],
      {
        name: 'idx23_flight_schedule_info'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx16_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx17_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx18_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx19_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx20_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx21_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx22_flight_schedule_info'
    );
    await queryInterface.removeIndex(
      'flight_schedule_info',
      'idx23_flight_schedule_info'
    );
  }
};
