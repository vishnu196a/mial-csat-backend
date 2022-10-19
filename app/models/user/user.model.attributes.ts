import bcrypt from 'bcrypt';

import { DataTypes } from 'sequelize';
import { UserInstance } from '../../types';
import { SALT_ROUND } from '../../config/constants';

import {
  isEmailUnique,
  isValidPassword,
  isAgentCodeUnique,
  isEmployeeNumberUnique
} from './user.model.validators';

export const modelOptions = {
  tableName: 'users',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  indexes: [{ fields: ['email', 'role', 'invited_by'] }]
};

export const attributes = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [3, 100] as readonly [number, number],
        msg: 'Name length should be 3 to 100 characters'
      },
      notNull: {
        msg: 'Name can\'t be empty',
        args: true
      }
    }
  },
  email: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmailUnique,
      isEmail: {
        args: true,
        msg: 'Invalid email'
      },
      len: {
        args: [1, 100] as readonly [number, number],
        msg: 'Email length should be 1 to 100 characters'
      },
      notNull: {
        args: true,
        msg: 'Email cannot be empty'
      }
    }
  },
  mobile_no: {
    type: DataTypes.STRING(15)
  },
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isEmployeeNumberUnique,
      notNull: {
        msg: 'employee_number can\'t be empty',
        args: true
      }
    }
  },
  agent_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isAgentCodeUnique,
      notNull: {
        msg: 'agent_code can\'t be empty',
        args: true
      }
    }
  },
  encrypted_password: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.VIRTUAL,
    validate: {
      isValidPassword
    },
    set(this: UserInstance, val: string) {
      if (!!val) {
        this.setDataValue('password', val),
          this.setDataValue(
            'encrypted_password',
            bcrypt.hashSync(val, SALT_ROUND)
          );
      }
    }
  },
  password_confirmation: {
    type: DataTypes.VIRTUAL
  },
  access_token: {
    type: DataTypes.TEXT
  },
  invited_by: {
    type: DataTypes.BIGINT,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  role_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id'
    },
    validate: {
      notNull: {
        msg: 'role_id can\'t be empty',
        args: true
      }
    }
  },
  sign_in_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  last_sign_in_ip: {
    type: DataTypes.STRING(50)
  },
  last_sign_in_at: {
    type: DataTypes.DATE
  },
  current_sign_in_ip: {
    type: DataTypes.STRING(50)
  },
  current_sign_in_at: {
    type: DataTypes.DATE
  },
  confirmed_at: {
    type: DataTypes.DATE
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
