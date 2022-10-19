import { UserInstance } from '../types';

export default class SurveyFromInvitationPolicy {
  constructor(private currentUser: UserInstance) {}

  canView() {
    return this.currentUser.isAdmin();
  }
  canResend() {
    return this.currentUser.isAdmin();
  }
}
