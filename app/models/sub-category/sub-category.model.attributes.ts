import { DataTypes } from 'sequelize';
import { isNameUnique } from './sub-category.model.validator';

export const modelOptions = {
  tableName: 'sub_categories',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  indexes: [{ fields: ['name'] }],
};

export const attributes = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isNameUnique,
      len: {
        args: [3, 100] as readonly [number, number],
        msg: 'Name should be greater than 3 and less than or equal to 100',
      },
      notNull: {
        msg: 'Name can\'t be empty',
        args: true,
      },
    },
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      mode: 'categories',
      key: 'id',
    },
    validate: {
      notNull: {
        msg: 'category_id can\'t be empty',
        args: true,
      },
    },
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
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
    reference: {
      model: 'users',
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'created_at can\'t be empty',
        args: true,
      },
    },
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'updated_at can\'t be empty',
        args: true,
      },
    },
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
};
