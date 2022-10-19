import { DataTypes } from 'sequelize';

export const modelOptions = {
  tableName: 'flight_schedule_info',
  underscored: true,
  updatedAt: 'updated_dt',
  createdAt: 'created_dt',
  indexes: [
    {
      fields: [
        'gate_name',
        'belt_name',
        'deleted_dt',
        'updated_dt',
        'flight_type',
        'airline_code',
        'flight_number',
        'boarding_time',
        'schedule_type',
        'arrival_airport',
        'departure_airport',
        'service_type_desc',
        'operational_status',
        'public_terminal_name',
        'flight_schedule_id',
        'actual_arrival_time',
        'arrival_airport_name',
        'flight_schedule_type',
        'actual_departure_time',
        'scheduled_arrival_time',
        'departure_airport_name',
        'estimated_arrival_time',
        'scheduled_departure_time',
        'estimated_departure_time',
        'operational_status_description'
      ]
    }
  ]
};

export const attributes = {
  gate_name: {
    type: DataTypes.STRING
  },
  flight_schedule_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'flight_schedule_id can\'t be empty',
        args: true
      }
    }
  },
  aodb_flight_id: {
    type: DataTypes.INTEGER,
  },
  airline_code: {
    type: DataTypes.STRING(10),
  },
  flight_number: {
    type: DataTypes.STRING(10),
  },
  flight_schedule_type: {
    type: DataTypes.STRING(10),
  },
  flight_type: {
    type: DataTypes.STRING(25),
  },
  operational_suffix: {
    type: DataTypes.STRING(1),
  },
  operational_status: {
    type: DataTypes.STRING(20),
  },
  code_context: {
    type: DataTypes.STRING(10),
  },
  departure_airport: {
    type: DataTypes.STRING(10),
  },
  arrival_airport: {
    type: DataTypes.STRING(10),
  },
  schedule_type: {
    type: DataTypes.STRING(20),
  },
  terminal_name: {
    type: DataTypes.STRING(50),
  },
  public_terminal_name: {
    type: DataTypes.STRING(50),
  },
  origin_date_time: {
    type: DataTypes.DATE,
  },
  scheduled_arrival_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'scheduled_arrival_time can\'t be empty',
        args: true
      }
    }
  },
  estimated_arrival_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'estimated_arrival_time can\'t be empty',
        args: true
      }
    }
  },
  actual_arrival_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'actual_arrival_time can\'t be empty',
        args: true
      }
    }
  },
  scheduled_departure_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'scheduled_departure_time can\'t be empty',
        args: true
      }
    }
  },
  estimated_departure_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'estimated_departure_time can\'t be empty',
        args: true
      }
    }
  },
  actual_departure_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'actual_departure_time can\'t be empty',
        args: true
      }
    }
  },
  stand_bay: {
    type: DataTypes.STRING(50),
  },
  service_type: {
    type: DataTypes.STRING(20),
  },
  service_type_desc: {
    type: DataTypes.STRING
  },
  special_action: {
    type: DataTypes.STRING(50),
  },
  delay_code: {
    type: DataTypes.STRING(50),
  },
  delay_duration: {
    type: DataTypes.STRING(50),
  },
  remark_text_code: {
    type: DataTypes.STRING(50),
  },
  remark_free_text: {
    type: DataTypes.STRING(50),
  },
  airline_name: {
    type: DataTypes.STRING(255),
  },
  arrival_airport_name: {
    type: DataTypes.STRING(255),
  },
  departure_airport_name: {
    type: DataTypes.STRING(255),
  },
  final_boarding_time: {
    type: DataTypes.DATE
  },
  boarding_time: {
    type: DataTypes.DATE
  },
  actual_touchdown_time: {
    type: DataTypes.DATE
  },
  actual_take_off_time: {
    type: DataTypes.DATE
  },
  first_bag_unloaded_time: {
    type: DataTypes.DATE
  },
  last_bag_unloaded_time: {
    type: DataTypes.DATE
  },
  gate_open_time: {
    type: DataTypes.DATE
  },
  gate_close_time: {
    type: DataTypes.DATE
  },
  ten_miles_out_time: {
    type: DataTypes.DATE
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
  },
  operational_status_description: {
    type: DataTypes.STRING
  }
};
