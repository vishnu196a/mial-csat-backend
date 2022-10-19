import { UserInstance } from '../types';

export default class SurveyFormResponsePolicy {
  constructor(private currentUser: UserInstance) {}

  canView() {
    return this.currentUser.isAdmin();
  }

  canViewDetail() {
    return this.currentUser.isAdmin();
  }
}
