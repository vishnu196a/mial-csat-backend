import { DataTypes } from 'sequelize';
import { isHandlerNameUnique, isNameUnique, isValidPayload } from './manager-report.model.validators';

export const modelOptions = {
  paranoid: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'manager_reports',
  indexes: [{ fields: ['name'] }],
};

export const attributes = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isNameUnique,
      notNull: {
        msg: 'Name can\'t be empty',
        args: true,
      },
    },
  },
  handler_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isHandlerNameUnique,
      notNull: {
        msg: 'handler_name can\'t be empty',
        args: true,
      },
    },
  },
  filter_columns: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'filter_columns can\'t be empty',
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
