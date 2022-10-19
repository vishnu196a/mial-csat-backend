import { DataTypes } from 'sequelize';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
  tableName: 'survey_form_responses'
};

export const attributes = {
  score: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  report: {
    type: DataTypes.JSON
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
  responses: {
    type: DataTypes.JSON,
    allowNull: false
  },
  survey_form_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'survey_forms'
    },
    validate: {
      notNull: {
        msg: 'survey_form_id can\'t be empty',
        args: true
      }
    }
  },
  survey_form_invitation_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'survey_form_invitations'
    },
    validate: {
      notNull: {
        msg: 'survey_form_invitation_id can\'t be empty',
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
