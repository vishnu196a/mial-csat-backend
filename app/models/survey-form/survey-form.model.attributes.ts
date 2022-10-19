import { DataTypes } from 'sequelize';

import { isNameUnique, isQuestionUnique } from './survey-form.model.validators';

export const modelOptions = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'survey_forms',
  underscored: true,
};

export const attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNameUnique,
      notNull: {
        msg: 'Name can\'t be empty',
        args: true,
      },
    },
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
    allowNull: true,
    references: {
      key: 'id',
      model: 'users',
    },
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isQuestionUnique,
      notNull: {
        msg: 'Questions can\'t be empty',
        args: true,
      },
    },
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
};
