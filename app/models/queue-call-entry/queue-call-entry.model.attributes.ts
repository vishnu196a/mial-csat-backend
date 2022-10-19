import { DataTypes } from 'sequelize';

export const modelOptions = {
  tableName: 'queue_call_entry',
  timestamps: false,
  underscored: true
};

export const attributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  queue: {
    type: DataTypes.STRING(50),
  },
  description: {
    type: DataTypes.STRING(255),
  },
  date_init: {
    type: DataTypes.DATE,
  },
  time_init: {
    type: DataTypes.TIME,
  },
  date_end: {
    type: DataTypes.DATE,
  },
  time_end: {
    type: DataTypes.TIME,
  },
  estatus: {
    type: DataTypes.STRING(1),
  },
  script: {
    type: DataTypes.TEXT,
  }
};
