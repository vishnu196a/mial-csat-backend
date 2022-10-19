import { DataTypes } from 'sequelize';
import CallTag from '../call-tag/call-tag.model';

export const modelOptions = {
  tableName: 'call_entry',
  timestamps: false,
  underscored: true
};

export const attributes = {
  trunk: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Trunk can\'t be empty',
        args: true
      }
    }
  },
  status: {
    type: DataTypes.STRING(32)
  },
  reason: {
    type: DataTypes.STRING
  },
  id_agent: {
    type: DataTypes.INTEGER,
  },
  callerid: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'callerid can\'t be empty',
        args: true
      }
    }
  },
  duration: {
    type: DataTypes.INTEGER
  },
  transfer: {
    type: DataTypes.STRING(6)
  },
  uniqueid: {
    type: DataTypes.STRING(32)
  },
  call_type: {
    type: DataTypes.STRING
  },
  id_contact: {
    type: DataTypes.INTEGER
  },
  id_campaign: {
    type: DataTypes.INTEGER
  },
  datetime_end: {
    type: DataTypes.DATE
  },
  datetime_init: {
    type: DataTypes.DATE
  },
  duration_wait: {
    type: DataTypes.INTEGER
  },
  call_back_queue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  id_queue_call_entry: {
    type: DataTypes.INTEGER
  },
  datetime_entry_queue: {
    type: DataTypes.DATE
  },
  abandoned_call_updated_by: {
    type: DataTypes.BIGINT,
    references: {
      key: 'id',
      model: 'users'
    }
  }
};
