import { DataTypes } from 'sequelize';

export const modelOptions = {
  tableName: 'flight_check_in_counter',
  underscored: true,
  updatedAt: 'updated_dt',
  createdAt: 'created_dt'
};

export const attributes = {
  qualifier: {
    type: DataTypes.STRING
  },
  last_position: {
    type: DataTypes.STRING
  },
  first_position: {
    type: DataTypes.STRING
  },
  check_in_class: {
    type: DataTypes.STRING
  },
  check_in_location: {
    type: DataTypes.STRING
  },
  flight_schedule_id: {
    type: DataTypes.INTEGER
  },
  check_counter_repeat_id: {
    type: DataTypes.INTEGER
  },
  flight_check_counter_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'flight_check_counter_id can\'t be empty',
        args: true
      }
    }
  },
  created_by: {
    type: DataTypes.STRING(10),
  },
  updated_by: {
    type: DataTypes.STRING(10),
  },
  created_dt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'created_dt can\'t be empty',
        args: true
      }
    }
  },
  updated_dt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'updated_dt can\'t be empty',
        args: true
      }
    }
  }
};
