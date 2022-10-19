'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE EVENT delete_old_flight_schedule_record
          ON SCHEDULE
            EVERY 1 DAY
            STARTS CURRENT_TIMESTAMP + INTERVAL 5 MINUTE
          COMMENT 'delete oldest record from the flight_schedule_info table'
          DO
            BEGIN
              INSERT INTO flight_schedule_info_back_lock
                SELECT * FROM flight_schedule_info where updated_dt < DATE(NOW() - INTERVAL 10 DAY);
              DELETE FROM flight_schedule_info where updated_dt < DATE(NOW() - INTERVAL 10 DAY);
            END
      `
    );
    await queryInterface.sequelize.query(
      `UPDATE mysql.event SET time_zone = '+05:30' WHERE name = 'delete_old_flight_schedule_record' `
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'DROP EVENT delete_old_flight_schedule_record'
    );
  }
};
