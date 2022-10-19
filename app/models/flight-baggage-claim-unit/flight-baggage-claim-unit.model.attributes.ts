import { DataTypes } from 'sequelize';

export const modelOptions = {
  tableName: 'flight_baggage_claim_unit',
  underscored: true,
  updatedAt: 'updated_dt',
  createdAt: 'created_dt'
};

export const attributes = {
  flight_baggage_claim_unit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'flight_baggage_claim_unit_id can\'t be empty',
        args: true
      }
    }
  },
  flight_schedule_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      key: 'flight_schedule_id',
      model: 'flight_schedule_info'
    }
  },
  repeat_index: {
    type: DataTypes.INTEGER
  },
  baggage_claim_unit: {
    type: DataTypes.STRING
  },
  qualifier: {
    type: DataTypes.STRING
  },
  qualifier_desc: {
    type: DataTypes.STRING
  },
  area_location: {
    type: DataTypes.STRING
  },
  area_location_desc: {
    type: DataTypes.STRING
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
