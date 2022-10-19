'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('flight_schedule_info_back_lock', {
      flight_schedule_id: {
        type: Sequelize.INTEGER
      },
      aodb_flight_id: {
        type: Sequelize.INTEGER
      },
      airline_code: {
        type: Sequelize.STRING(10)
      },
      flight_number: {
        type: Sequelize.STRING(10)
      },
      flight_schedule_type: {
        type: Sequelize.STRING(10)
      },
      flight_type: {
        type: Sequelize.STRING(25)
      },
      operational_suffix: {
        type: Sequelize.STRING(1)
      },
      operational_status: {
        type: Sequelize.STRING(20)
      },
      code_context: {
        type: Sequelize.STRING(10)
      },
      departure_airport: {
        type: Sequelize.STRING(10)
      },
      arrival_airport: {
        type: Sequelize.STRING(10)
      },
      schedule_type: {
        type: Sequelize.STRING(20)
      },
      terminal_name: {
        type: Sequelize.STRING(50)
      },
      public_terminal_name: {
        type: Sequelize.STRING(50)
      },
      origin_date_time: {
        type: Sequelize.DATE
      },
      scheduled_arrival_time: {
        type: Sequelize.DATE
      },
      estimated_arrival_time: {
        type: Sequelize.DATE
      },
      actual_arrival_time: {
        type: Sequelize.DATE
      },
      scheduled_departure_time: {
        type: Sequelize.DATE
      },
      estimated_departure_time: {
        type: Sequelize.DATE
      },
      actual_departure_time: {
        type: Sequelize.DATE
      },
      final_boarding_time: {
        type: Sequelize.DATE
      },
      boarding_time: {
        type: Sequelize.DATE
      },
      actual_touchdown_time: {
        type: Sequelize.DATE
      },
      actual_take_off_time: {
        type: Sequelize.DATE
      },
      first_bag_unloaded_time: {
        type: Sequelize.DATE
      },
      last_bag_unloaded_time: {
        type: Sequelize.DATE
      },
      gate_open_time: {
        type: Sequelize.DATE
      },
      gate_close_time: {
        type: Sequelize.DATE
      },
      ten_miles_out_time: {
        type: Sequelize.DATE
      },
      stand_bay: {
        type: Sequelize.STRING(50)
      },
      service_type: {
        type: Sequelize.STRING(20)
      },
      special_action: {
        type: Sequelize.STRING(50)
      },
      delay_code: {
        type: Sequelize.STRING(50)
      },
      delay_duration: {
        type: Sequelize.STRING(50)
      },
      remark_text_code: {
        type: Sequelize.STRING(50)
      },
      remark_free_text: {
        type: Sequelize.STRING(50)
      },
      created_by: {
        type: Sequelize.STRING(10)
      },
      created_dt: {
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(10)
      },
      updated_dt: {
        type: Sequelize.DATE
      },
      airline_name: {
        type: Sequelize.STRING(255)
      },
      departure_airport_name: {
        type: Sequelize.STRING(255)
      },
      arrival_airport_name: {
        type: Sequelize.STRING(255)
      },
      deleted_dt: {
        type: Sequelize.DATE
      },
      operational_status_description: {
        type: Sequelize.STRING
      },
      gate_name: {
        type: Sequelize.STRING
      },
      service_type_desc: {
        type: Sequelize.STRING
      }
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('flight_schedule_info_back_lock')
};
