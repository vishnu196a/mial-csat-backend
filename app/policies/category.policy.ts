import { UserInstance } from '../types';

export default class CategoryPolicy {
  constructor(private currentUser: UserInstance) {}
  canAdd() {
    return this.currentUser.isAdmin();
  }

  caUpdate() {
    return this.currentUser.isAdmin();
  }
  canDelete() {
    return this.currentUser.isAdmin();
  }

  canView() {
    return this.currentUser.isAdmin || this.currentUser.isAgent;
  }
}
