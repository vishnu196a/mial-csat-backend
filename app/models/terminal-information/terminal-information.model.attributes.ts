import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'terminal_informations',
  underscored: true,
};

export const attributes = {
  phone: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Category can\'t be empty',
        args: true
      }
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Location can\'t be empty',
        args: true
      }
    }
  },
  shop_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Shop name can\'t be empty',
        args: true
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  terminal_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'terminals'
    },
    validate: {
      notNull: {
        msg: 'Terminal can\'t be empty',
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
    references: {
      key: 'id',
      model: 'users',
    },
  },
};
