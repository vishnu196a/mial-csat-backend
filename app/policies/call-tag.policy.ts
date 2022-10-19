import { UserInstance } from '../types';

export default class CallTagPolicy {
  constructor(private currentUser: UserInstance) {}
  canAdd() {
    return this.currentUser.isAdmin() || this.currentUser.isAgent();
  }
  canUpdate() {
    return this.currentUser.isAdmin();
  }
  canDelete() {
    return this.currentUser.isAdmin();
  }
}
