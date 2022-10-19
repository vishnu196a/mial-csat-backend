import { DataTypes } from 'sequelize';
import { isValidContact } from './survey-form-invitation.model.validators';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'survey_form_invitations',
  underscored: true,
};

export const attributes = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      notNull: {
        msg: 'id can\'t be empty',
        args: true
      }
    }
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users'
    },
    validate: {
      notNull: {
        msg: 'user_id can\'t be empty',
        args: true
      }
    }
  },
  survey_form_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'survey_forms',
      key: 'id',
    },
    validate: {
      notNull: {
        msg: 'survey_form_id can\'t be empty',
        args: true
      }
    }
  },
  resent_by_id: {
    type: DataTypes.BIGINT,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  call_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'call_id can\'t be empty',
        args: true
      }
    }
  },
  type: {
    type: DataTypes.ENUM(
      'Email', 'SMS'
    ),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Type can\'t be empty',
        args: true
      }
    }
  },
  status: {
    type: DataTypes.STRING(100)
  },
  contact: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isValidContact,
      notNull: {
        msg: 'Content can\'t be empty',
        args: true
      }
    }
  },
  invitation_url: {
    type: DataTypes.TEXT
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
  resent_at: {
    type: DataTypes.DATE,
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
