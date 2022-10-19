import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'request_emails',
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Title can\'t be empty',
        args: true
      }
    }
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name can\'t be empty',
        args: true
      }
    }
  },
  last_name: {
    type: DataTypes.STRING
  },
  date_of_birth: {
    type: DataTypes.DATEONLY
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  postal_code: {
    type: DataTypes.STRING,
  },
  mobile_no: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Mobile number can\'t be empty',
        args: true
      }
    }
  },
  telephone: {
    type: DataTypes.STRING
  },
  mail_to_feedback_team: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  email: {
    type: DataTypes.STRING
  },
  nationality: {
    type: DataTypes.STRING
  },
  passport_number: {
    type: DataTypes.STRING
  },
  place_of_make: {
    type: DataTypes.STRING
  },
  port_of_destination: {
    type: DataTypes.STRING
  },
  date_of_issue: {
    type: DataTypes.DATE,
  },
  contact_person_email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Contact person email id can\'t be empty',
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
  meet_and_assist: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Meet and Assist can\'t be empty',
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
