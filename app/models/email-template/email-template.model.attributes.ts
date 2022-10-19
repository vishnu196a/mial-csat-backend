import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  tableName: 'email_templates',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
  indexes: [{ fields: ['name'] }]
};

export const attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 255] as readonly [number, number],
        msg: 'Name length should be 3 to 255 characters'
      },
      notNull: {
        msg: 'Name can\'t be empty',
        args: true
      }
    }
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'categories'
    },
    validate: {
      notNull: {
        msg: 'category_id can\'t be empty',
        args: true
      }
    }
  },
  sub_category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'sub_categories'
    },
    validate: {
      notNull: {
        msg: 'sub_category_id can\'t be empty',
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
