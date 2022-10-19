import { UserInstance } from '../types';

export default class FlightStatusPolicy {
  constructor(private currentUser: UserInstance) {}

  canView() {
    return this.currentUser.isAdmin || this.currentUser.isAgent;
  }
}
