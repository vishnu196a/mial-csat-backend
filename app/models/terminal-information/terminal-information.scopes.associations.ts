import { Terminal, TerminalInformation } from '..';

function defineScopeAndAssociation() {
  TerminalInformation.belongsTo(Terminal, {
    as: 'terminal',
    foreignKey: 'terminal_id'
  });
}

export default defineScopeAndAssociation;
