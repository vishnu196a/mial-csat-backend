import { DataTypes } from 'sequelize';

export const modelOptions = {
  tableName: 'current_call_entry'
};

export const attributes = {
  id_agent: {
    type: DataTypes.BIGINT,
    alloNull: false
  },
  id_queue_call_entry: {
    type: DataTypes.BIGINT,
    alloNull: false,
    allowNull: false,
    references: {
      key: 'id',
      model: 'queue_call_entry'
    },
  },
  id_call_entry: {
    type: DataTypes.BIGINT,
    alloNull: false
  },
  callerid: {
    type: DataTypes.INTEGER,
    alloNull: false
  },
  datetime_init: {
    type: DataTypes.DATE,
  },
  uniqueid: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'uniqueid can\'t be empty',
        args: true
      }
    }
  },
  ChannelClient: {
    type: DataTypes.STRING(32),
  },
  hold: {
    type: DataTypes.STRING(5),
  },
};
