'use strict';

const moment = require('moment');

const callBasedAgentsTemepleColumns = {
  columns: { 'AGENT NAME': 'users.name as username' }
};

const callBasedAgentsTemepleFilters = {
  filters: {
    'call Source': 'call_type',
    'From Date': 'from',
    'To Date': 'to',
    Agent: 'agent'
  }
};

const callPickUpComplainceTempleteColumns = {
  columns: {
    CALL_LOG_NO: 'call_entry.uniqueid',
    CALL_LOG_DATE: 'call_entry.datetime_entry_queue',
    CALLER_ID: 'call_entry.callerid',
    AGENT_NO: 'users.agent_code',
    AGENT_NAME: 'users.name as  agent_name',
    STATUS: 'call_entry.status as status'
  }
};

const callPickUpComplainceTempleteFilters = {
  filters: {
    'From Date': 'from',
    'To Date': 'to',
    Agent: 'agent'
  }
};

const callsBasedOnCallTypeTempleteColumns = {
  columns: { CALL_SOURCE: 'call_entry.call_type as call_source' }
};

const callsBasedOnCallTypeTempleteFilters = {
  filters: {
    'call type': 'call_type',
    'From Date': 'from',
    'To Date': 'to'
  }
};

const callsBasedOnModeOfCallTempleteColumns = {
  columns: { 'MODE OF CALL': 'call_tags.mode as mode_of_call' }
};

const callsBasedOnModeOfCallTempleteFilters = {
  filters: {
    'From Date': 'from',
    'To Date': 'to',
    'Mode of call': 'mode_of_call'
  }
};

const callSummaryTempleteColumns = {
  columns: {
    CALL_BASED_ON_AGENT_FILL_REPORTS: { AGENT_NAME: 'users.name as username' },
    CALL_TYPE_FILL_REPORTS: {
      CALL_SOURCE: 'call_entry.call_type as call_source'
    },
    MODE_OF_CALL_FILL_REPORT: {
      MODE_OF_CALL: 'call_tags.mode as mode_of_call'
    },
    CALL_CATEGORY_FILL_REPORT: {
      CALL_CATEGORY: 'categories.name as category_name',
      CALL_SUBCATEGORY: 'sub_categories.name as sub_category_name'
    }
  }
};

const callSummaryTempleteFilters = {
  filters: {
    'From Date': 'from',
    'To Date': 'to'
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('manager_reports', [
      {
        id: 1,
        name: 'CALLS BASED ON AGENTS',
        handler_name: `calls-based-on-agents-2022-09-12 18:28:50`,
        payload: JSON.stringify(callBasedAgentsTemepleColumns),
        filter_columns: JSON.stringify(callBasedAgentsTemepleFilters),
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'CALL PICK UP COMPLAINCE',
        handler_name: `call-pick-up-complaince-2022-09-12 18:28:55`,
        payload: JSON.stringify(callPickUpComplainceTempleteColumns),
        filter_columns: JSON.stringify(callPickUpComplainceTempleteFilters),
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'CALLS BASED ON CALL TYPE',
        handler_name: `calls-based-on-call-type-2022-09-12 18:29:10`,
        payload: JSON.stringify(callsBasedOnCallTypeTempleteColumns),
        filter_columns: JSON.stringify(callsBasedOnCallTypeTempleteFilters),
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'CALLS BASED ON MODE OF CALL',
        handler_name: `calls-based-on-mode-of-call-2022-09-12 18:29:23`,
        payload: JSON.stringify(callsBasedOnModeOfCallTempleteColumns),
        filter_columns: JSON.stringify(callsBasedOnModeOfCallTempleteFilters),
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'CALL SUMMARY',
        handler_name: `call-summary-2022-09-12 18:30:01`,
        payload: JSON.stringify(callSummaryTempleteColumns),
        filter_columns: JSON.stringify(callSummaryTempleteFilters),
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('manager_reports', null);
  }
};
