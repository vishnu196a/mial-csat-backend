import { DataTypes } from 'sequelize';
import { isValidPayload } from './download-queue.model.validators';
import { DOWNLOAD_QUEUE_STATUS } from '../../config/constants';

export const modelOptions = {
  paranoid: true,
  tableName: 'download_queues',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
  indexes: [{ fields: ['user_id', 'status'] }]
};

export const attributes = {
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name can\'t be empty',
        args: true
      }
    }
  },
  status: {
    type: DataTypes.ENUM(...Object.values(DOWNLOAD_QUEUE_STATUS)),
    defaultValue: DOWNLOAD_QUEUE_STATUS.pending
  },
  payload: {
    type: DataTypes.JSON,
    validate: { isValidPayload }
  },
  report_download_path: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  retry_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('Dynamic', 'Static'),
    defaultValue: 'Dynamic'
  },
  error: {
    type: DataTypes.ARRAY(DataTypes.STRING())
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
