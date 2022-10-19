import { DataTypes } from 'sequelize';
import { isValidPayload } from './dynamic-report-template.model.validators';

export const modelOptions = {
  paranoid: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'dynamic_report_templates',
  indexes: [{ fields: ['name'] }],
};

export const attributes = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name can\'t be empty',
        args: true,
      },
    },
  },
  payload: {
    type: DataTypes.JSON,
    validate: { isValidPayload },
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users',
    },
    validate: {
      notNull: {
        msg: 'created_by can\'t be empty',
        args: true,
      },
    },
  },
  updated_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      key: 'id',
      model: 'users',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
};
