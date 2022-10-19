import Sequelize from 'sequelize';
import { FlightStatusListQueryParams } from '../../types';

const { Op } = Sequelize;
const globalSearchQuery = (query: FlightStatusListQueryParams) => {
  const text = query.q;
  const searchQueries: any = [];

  searchQueries.push({
    gate_name: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    flight_type: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    airline_name: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    schedule_type: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    operational_status_description: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    flight_schedule_id: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    service_type_desc: { [Op.like]: `${text}%` }
  });
  searchQueries.push({
    flight_number: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    airline_code: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    public_terminal_name: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    arrival_airport_name: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    departure_airport_name: { [Op.like]: `${text}%` },
  });
  searchQueries.push({
    operational_status: { [Op.like]: `${text}%` },
  });
  const actualArrivalTimeQuery = Sequelize.where(
    Sequelize.fn(
      'date_format', Sequelize.col('actual_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
    {
      [Op.like]: `%${text}%`
    });
  searchQueries.push(actualArrivalTimeQuery);
  const actualDepartureTimeQuery = Sequelize.where(
    Sequelize.fn(
      'date_format', Sequelize.col('actual_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
    {
      [Op.like]: `%${text}%`
    });
  searchQueries.push(actualDepartureTimeQuery);
  const scheduledArrivalTimeQuery = Sequelize.where(
    Sequelize.fn(
      'date_format', Sequelize.col('scheduled_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
    {
      [Op.like]: `%${text}%`
    });
  searchQueries.push(scheduledArrivalTimeQuery);

  const estimatedArrivalTimeQuery = Sequelize.where(
    Sequelize.fn(
      'date_format', Sequelize.col('estimated_arrival_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
    {
      [Op.like]: `%${text}%`
    });
  searchQueries.push(estimatedArrivalTimeQuery);

  const scheduledDepartureTime = Sequelize.where(
    Sequelize.fn(
      'date_format', Sequelize.col('scheduled_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
    {
      [Op.like]: `%${text}%`
    });
  searchQueries.push(scheduledDepartureTime);

  const estimatedDepartureTimeQuery = Sequelize.where(
    Sequelize.fn(
      'date_format', Sequelize.col('estimated_departure_time'), '%Y-%m-%dT%H:%i:%s.00Z'
      ),
    {
      [Op.like]: `%${text}%`
    });
  searchQueries.push(estimatedDepartureTimeQuery);

  const beltNameQuery = Sequelize.where(
    Sequelize.col('flight_baggage_claim_unit.baggage_claim_unit'),
    {
      [Op.like]: `%${text}%`
    }
  );
  searchQueries.push(beltNameQuery);

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};

export default globalSearchQuery;
