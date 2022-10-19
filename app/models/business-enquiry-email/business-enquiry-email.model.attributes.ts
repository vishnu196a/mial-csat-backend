import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'business_enquiry_emails',
  underscored: true
};

export const attributes = {
  name: {
    type: DataTypes.STRING
  },
  phone_no: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATEONLY
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'comments can\'t be empty',
        args: true
      }
    }
  },
  customer_email_id: {
    type: DataTypes.STRING
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email id can\'t be empty',
        args: true
      }
    }
  },
  call_entry_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'call_entry'
    },
    validate: {
      notNull: {
        msg: 'call_entry_id can\'t be empty',
        args: true
      }
    }
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'created_by can\'t be empty',
        args: true
      }
    },
    references: {
      key: 'id',
      model: 'users'
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
