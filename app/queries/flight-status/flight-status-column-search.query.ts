import moment from 'moment';
import Sequelize from 'sequelize';
import { SCHEDULE_TYPE } from '../../config/constants';
import { FlightStatusListQueryParams } from '../../types';

const { Op } = Sequelize;

const columnSearchQuery = (query: FlightStatusListQueryParams) => {
  let toDateQuery;
  let fromDateQuery;
  const {
    to,
    from,
    gate_name: gateName,
    flight_type: flightType,
    flight_name: flightName,
    airline_code: airlineCode,
    flight_number: flightNo,
    belt_name: beltName,
    schedule_type: scheduleType,
    actual_arrival_time: actualArrivalTime,
    actual_departure_time: actualDepartureTime,
    service_type_desc: serviceTypeDesc,
    flight_schedule_id: flightScheduleId,
    operational_status: operationalStatus,
    public_terminal_name: publicTerminalName,
    arrival_airport_name: arrivalAirport,
    departure_airport_name: departureAirport,
    scheduled_arrival_time: scheduledArrivalTime,
    estimated_arrival_time: estimatedArrivalTime,
    scheduled_departure_time: scheduledDepartureTime,
    estimated_departure_time: estimatedDepartureTime,
    operational_status_description: operationalStatusDescription
  } = query;
  const searchQueries: any[] = [];
  if (gateName) {
    const gateNameQuery = { gate_name: { [Op.like]: `%${gateName}%` } };
    searchQueries.push(gateNameQuery);
  }
  if (beltName) {
    const beltNameQuery = Sequelize.where(Sequelize.col('flight_baggage_claim_unit.baggage_claim_unit'), {
      [Op.like]: `${beltName}%`
    });
    searchQueries.push(beltNameQuery);
  }
  if (flightType) {
    const flightTypeQuery = { flight_type: { [Op.like]: `${flightType}%` } };
    searchQueries.push(flightTypeQuery);
  }
  if (flightName) {
    const flightNameQuery = {
      [Op.or]: [
        {
          airline_code: { [Op.like]: `${flightName}%` }
        },
        {
          airline_name: { [Op.like]: `${flightName}%` }
        }
      ]
    };
    searchQueries.push(flightNameQuery);
  }
  if (scheduleType) {
    const scheduleTypeQuery = { schedule_type: { [Op.like]: `${scheduleType}%` } };
    searchQueries.push(scheduleTypeQuery);
  }
  if (airlineCode) {
    const airlineCodeQuery = { airline_code: { [Op.like]: `${airlineCode}%` } };
    searchQueries.push(airlineCodeQuery);
  }
  if (flightNo) {
    const flightNoQuery = { flight_number: { [Op.like]: `${flightNo}%` } };
    searchQueries.push(flightNoQuery);
  }
  if (publicTerminalName) {
    const publichTerminalNameQuery = {
      public_terminal_name: { [Op.like]: `${publicTerminalName}%` }
    };
    searchQueries.push(publichTerminalNameQuery);
  }
  if (serviceTypeDesc) {
    const serviceTypeDescQuery = { service_type_desc: { [Op.like]: `${serviceTypeDesc}%` } };
    searchQueries.push(serviceTypeDescQuery);
  }
  if (flightScheduleId) {
    const flightScheduleIdQuery = { flight_schedule_id: { [Op.like]: `${flightScheduleId}%` } };
    searchQueries.push(flightScheduleIdQuery);
  }
  if (arrivalAirport) {
    const arrivalAirportQuery = {
      [Op.or]: [
        {
          arrival_airport_name: { [Op.like]: `${arrivalAirport}%` }
        },
        {
          arrival_airport: { [Op.like]: `${arrivalAirport}%` }
        }
      ]
    };
    searchQueries.push(arrivalAirportQuery);
  }
  if (operationalStatus) {
    const operationalStatusQuery = { operational_status: { [Op.like]: `${operationalStatus}%` } };
    searchQueries.push(operationalStatusQuery);
  }
  if (departureAirport) {
    const departureAirportQuery = {
      [Op.or]: [
        {
          departure_airport_name: { [Op.like]: `${departureAirport}%` }
        },
        {
          departure_airport: { [Op.like]: `${departureAirport}%` }
        }
      ]
    };
    searchQueries.push(departureAirportQuery);
  }
  if (scheduledArrivalTime) {
    const scheduledArrivalTimeQuery = Sequelize.where(
      Sequelize.fn(
        'date_format', Sequelize.col('scheduled_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
      {
        [Op.between]: [
          `${moment(scheduledArrivalTime).startOf('day').format()}%`,
          `${moment(scheduledArrivalTime).endOf('day').format()}%`,
        ]
      });
    searchQueries.push(scheduledArrivalTimeQuery);
  }
  if (estimatedArrivalTime) {
    const estimatedArrivalTimeQuery = Sequelize.where(
      Sequelize.fn(
        'date_format', Sequelize.col('estimated_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'),
      {
        [Op.between]: [
          `${moment(estimatedArrivalTime).startOf('day').format()}%`,
          `${moment(estimatedArrivalTime).endOf('day').format()}%`,
        ]
      });
    searchQueries.push(estimatedArrivalTimeQuery);
  }
  if (actualArrivalTime) {
    const actualArrivalTimeQuery = Sequelize.where(
      Sequelize.fn(
        'date_format', Sequelize.col('actual_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
      {
        [Op.between]: [
          `${moment(actualArrivalTime).startOf('day').format()}%`,
          `${moment(actualArrivalTime).endOf('day').format()}%`,
        ]
      });
    searchQueries.push(actualArrivalTimeQuery);
  }
  if (scheduledDepartureTime) {
    const scheduledDepartureTimeQuery = Sequelize.where(
      Sequelize.fn(
        'date_format', Sequelize.col('scheduled_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
      {
        [Op.between]: [
          `${moment(scheduledDepartureTime).startOf('day').format()}%`,
          `${moment(scheduledDepartureTime).endOf('day').format()}%`,
        ]
      });
    searchQueries.push(scheduledDepartureTimeQuery);

  }
  if (estimatedDepartureTime) {
    const estimatedDepartureTimeQuery = Sequelize.where(
      Sequelize.fn(
        'date_format', Sequelize.col('estimated_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
      {
        [Op.between]: [
          `${moment(estimatedDepartureTime).startOf('day').format()}%`,
          `${moment(estimatedDepartureTime).endOf('day').format()}%`,
        ]
      });
    searchQueries.push(estimatedDepartureTimeQuery);
  }
  if (actualDepartureTime) {
    const actualDepartureTimeQuery = Sequelize.where(
      Sequelize.fn(
        'date_format', Sequelize.col('actual_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
      {
        [Op.between]: [
          `${moment(actualDepartureTime).startOf('day').format()}%`,
          `${moment(actualDepartureTime).endOf('day').format()}%`,
        ]
      });
    searchQueries.push(actualDepartureTimeQuery);
  }
  if (operationalStatusDescription) {
    const operationalStatusDescriptionQuery = { operational_status_description: { [Op.like]: `${operationalStatusDescription}%` } };
    searchQueries.push(operationalStatusDescriptionQuery);
  }

  if (!from && !to) {
    toDateQuery = moment().add(1, 'days').endOf('day').format();
    fromDateQuery = moment().subtract(7, 'days').startOf('day').format();
  } else if (from && !to) {
    toDateQuery = moment().add(1, 'days').endOf('day').format();
    fromDateQuery = moment(from).startOf('day').format();
  }  else if (!from && to) {
    toDateQuery = moment(to).endOf('day').format();
    fromDateQuery = moment().subtract(7, 'days').startOf('day').format();
  } else {
    toDateQuery = moment(to).endOf('day').format();
    fromDateQuery = moment(from).startOf('day').format();
  }

  if ((scheduleType) && (scheduleType.toLowerCase() === SCHEDULE_TYPE.arrival)) {
    searchQueries.push(
      {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'date_format', Sequelize.col('scheduled_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
            ),
            {
              [Op.between]: [
                `${fromDateQuery}%`,
                `${toDateQuery}%`
              ]
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'date_format', Sequelize.col('estimated_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'),
            {
              [Op.between]: [
                `${fromDateQuery}%`,
                `${toDateQuery}%`
              ]
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'date_format', Sequelize.col('actual_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
            ),
            {
              [Op.between]: [
                `${fromDateQuery}%`,
                `${toDateQuery}%`
              ]
            }
          )
        ]
      }
    );
  }

  if ((scheduleType) && (scheduleType.toLowerCase() === SCHEDULE_TYPE.departure)) {
    searchQueries.push(
      {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'date_format', Sequelize.col('scheduled_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
            ),
            {
              [Op.between]: [
                `${fromDateQuery}%`,
                `${toDateQuery}%`
              ]
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'date_format', Sequelize.col('estimated_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
            ),
            {
              [Op.between]: [
                `${fromDateQuery}%`,
                `${toDateQuery}%`
              ]
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'date_format', Sequelize.col('actual_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
            ),
            {
              [Op.between]: [
                `${fromDateQuery}%`,
                `${toDateQuery}%`
              ]
            }
          )
        ]
      }
    );
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;
