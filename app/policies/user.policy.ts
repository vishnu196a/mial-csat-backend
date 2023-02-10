import { UserInstance } from '../types';

export default class UserPolicy {
  constructor(private currentUser: UserInstance) {}

  canAdd() {
    return this.currentUser.isAdmin();
  }

  canDelete(user) {
    return this.currentUser.isAdmin() &&
    (user.id !== this.currentUser.id);
  }

  canUpdate() {
    return this.currentUser.isAdmin();
  }
}
