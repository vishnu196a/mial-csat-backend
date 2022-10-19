import { UserInstance } from '../types';

export default class TerminalPolicy {
  constructor(private currentUser: UserInstance) {}
  canAdd() {
    return this.currentUser.isAdmin();
  }
  canView() {
    return this.currentUser.isAdmin();
  }
  canViewDetail() {
    return this.currentUser.isAdmin();
  }
  canUpdate() {
    return this.currentUser.isAdmin();
  }
  canDelete() {
    return this.currentUser.isAdmin();
  }
}
