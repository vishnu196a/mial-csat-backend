import { DataTypes } from 'sequelize';

export const modelOptions = {
  underscored: true,
  tableName: 'agent',
  timestamps: false
};

export const attributes = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Type can\'t be empty',
        args: true
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name can\'t be empty',
        args: true
      }
    }
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Number can\'t be empty',
        args: true
      }
    }
  },
  estatus: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password can\'t be empty',
        args: true
      }
    }
  },
  eccp_password: {
    type: DataTypes.STRING
  }
};
