import { UserInstance } from '../types';

export default class SurveyFormPolicy {
  constructor(private currentUser: UserInstance) {}
  canAdd() {
    return this.currentUser.isAdmin();
  }
  canView() {
    return this.currentUser.isAdmin();
  }
  canViewReportList() {
    return this.currentUser.isAdmin();
  }
  canUpdate() {
    return this.currentUser.isAdmin();
  }
}
