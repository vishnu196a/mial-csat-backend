import {
  Contact,
  CallTag,
  Terminal,
  TerminalInformation
} from '..';

function defineScopeAndAssociation() {
  Terminal.hasMany(Contact, {
    as: 'contact',
    foreignKey: 'terminal_id'
  });
  Terminal.hasMany(CallTag, {
    as: 'call_tag',
    foreignKey: 'terminal_id'
  });
  Terminal.hasMany(TerminalInformation, {
    as: 'terminal_information',
    foreignKey: 'terminal_id'
  });
}

export default defineScopeAndAssociation;
