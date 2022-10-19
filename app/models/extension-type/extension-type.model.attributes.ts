import { DataTypes } from 'sequelize';

export const modelOptions = {
  tableName: 'extensions_types',
  underscored: true,
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
  extension: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Extension can\'t be empty',
        args: true
      }
    }
  }
};
