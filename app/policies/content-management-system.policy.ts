import { UserInstance } from '../types';

export default class ContentManagementSystemPolicy {
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
