import { DataTypes } from 'sequelize';

import {
  isEmailUnique,
  isValidPhoneNumber,
  isValidLandLineNumber,
  isMobileNumberPresent
} from './contact.model.validator';

export const modelOptions = {
  paranoid: true,
  underscored: true,
  tableName: 'contacts',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [{ fields: ['name', 'email', 'phone'] }],
  validate: {
    isMobileNumberPresent
  }
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
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmailUnique,
      notNull: {
        msg: 'Email can\'t be empty',
        args: true,
      },
      isEmail: {
        msg: 'Email should be valid format',
        args: true,
      },
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    validate: {
      isValidPhoneNumber
    },
  },
  landline_number: {
    type: DataTypes.STRING(15),
    validate: {
      isValidLandLineNumber
    },
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
        msg: 'terminal_id can\'t be empty',
        args: true
      }
    }
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'categories',
    },
    validate: {
      notNull: {
        msg: 'category_id can\'t be empty',
        args: true,
      },
    },
  },
  sub_category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'sub_categories',
    },
    validate: {
      notNull: {
        msg: 'sub_category_id can\'t be empty',
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
    notNull: {
      msg: 'created_by can\'t be empty',
      args: true,
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
