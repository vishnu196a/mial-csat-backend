import { DataTypes } from 'sequelize';
import { isNameUnique } from './terminal.model.validator';

export const modelOptions = {
  indexes: [{ fields: ['name'] }],
  paranoid: true,
  tableName: 'terminals',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true
};

export const attributes = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isNameUnique,
      notNull: {
        msg: 'Name can\'t be empty',
        args: true
      },
      notEmpty: {
        msg: 'Name can\'t be empty',
        args: true
      }
    }
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users'
    },
    validate: {
      notNull: {
        msg: 'created_by can\'t be empty',
        args: true
      }
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'created_at can\'t be empty',
        args: true
      }
    }
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'updated_at can\'t be empty',
        args: true
      }
    }
  },
  deleted_at: {
    type: DataTypes.DATE
  }
};
