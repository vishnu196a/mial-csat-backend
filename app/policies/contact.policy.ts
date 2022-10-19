import { UserInstance } from '../types';

export default class ContactPolicy {
  constructor(private currentUser: UserInstance) {}
  canAdd() {
    return this.currentUser.isAdmin();
  }
  canUpdate() {
    return this.currentUser.isAdmin();
  }
  canDelete() {
    return this.currentUser.isAdmin();
  }
}
