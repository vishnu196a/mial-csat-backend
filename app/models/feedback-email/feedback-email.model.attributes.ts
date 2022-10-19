import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'feedback_emails',
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
  responded: {
    type: DataTypes.TEXT
  },
  mail_to_feedback_team: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  flight_info: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Flight info can\'t be empty',
        args: true
      }
    }
  },
  date_of_journey: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Date of journey can\'t be empty',
        args: true
      }
    }
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email can\'t be empty',
        args: true
      }
    }
  },
  caller_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Caller name can\'t be empty',
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
  feedback: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Feedback can\'t be empty',
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
