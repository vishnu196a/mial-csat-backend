import { DataTypes } from 'sequelize';
import { CONTENT_MANAGEMENT_SYSTEM_TYPE } from '../../config/constants';

export const modelOptions = {
  paranoid: true,
  tableName: 'content_management_system',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true
};

export const attributes = {
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
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Content can\'t be empty',
        args: true
      }
    }
  },
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
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      key: 'id',
      model: 'categories'
    }
  },
  sub_category_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      key: 'id',
      model: 'sub_categories'
    }
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users'
    },
    validate: {
      notNull: {
        msg: 'created_by can\'t be empty',
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
