import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'emergency_emails',
  underscored: true
};

export const attributes = {
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
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Subject can\'t be empty',
        args: true
      }
    }
  },
  phone_no: {
    type: DataTypes.STRING
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email Id can\'t be empty',
        args: true
      }
    }
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Comments can\'t be empty',
        args: true
      }
    }
  },
  department: {
    type: DataTypes.STRING
  },
  contact_person: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Contact person can\'t be empty',
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
