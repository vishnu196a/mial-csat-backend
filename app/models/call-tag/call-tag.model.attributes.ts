import { DataTypes } from 'sequelize';
import { checkCategory } from './call-tag.model.validator';
import { MODE_OF_CALL } from '../../config/constants';

export const modelOptions = {
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'call_tags',
  underscored: true,
  validate: {
    checkCategory
  }
};

export const attributes = {
  mode: {
    type: DataTypes.ENUM(...Object.values(MODE_OF_CALL)),
    defaultValue: MODE_OF_CALL.query
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Answer can\'t be empty',
        args: true
      }
    }
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Question can\'t be empty',
        args: true
      }
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
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'categories'
    },
    validate: {
      notNull: {
        msg: 'Category can\'t be empty',
        args: true
      }
    }
  },
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
  sub_category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      key: 'id',
      model: 'sub_categories'
    },
    validate: {
      notNull: {
        msg: 'Sub category can\'t be empty',
        args: true
      }
    }
  },
  caller_name: {
    type: DataTypes.STRING(100)
  },
  contact_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Contact number can\'t be empty',
        args: true
      }
    }
  },
  terminal_id: {
    type: DataTypes.BIGINT,
    references: {
      key: 'id',
      model: 'terminals'
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
