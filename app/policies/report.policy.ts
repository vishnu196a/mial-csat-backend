import { UserInstance } from '../types';

export default class UserPolicy {
  constructor(private currentUser: UserInstance) {}

  canViewCategoryList() {
    return this.currentUser.isAdmin();
  }

  canViewCategoryChart() {
    return this.currentUser.isAdmin();
  }

  canViewSubCategoryList() {
    return this.currentUser.isAdmin();
  }

  canViewSubCategoryChart() {
    return this.currentUser.isAdmin();
  }

  canViewTopThreeSubCategoryList() {
    return this.currentUser.isAdmin();
  }

  canDownloadCategoryReport() {
    return this.currentUser.isAdmin();
  }

  canDownloadSubCategoryReport() {
    return this.currentUser.isAdmin();
  }
}
