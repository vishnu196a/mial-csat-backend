import logger from './logger';
import { UserInstance } from '../types';

const type = 'ActivityLog';

function getUserLogFormat(user: UserInstance) {
  return {
    id: user.id,
    name: user.name,
    role: user.role_id
  };
}

function activityMessageFormat(
  user: UserInstance,
  resourceName: string,
  action: string
): string {
  return `${user.name} ${action} ${resourceName} successfully`;
}

function log(user: UserInstance, resource: any, resourceName: string, action: string) {
  const activityMessage = activityMessageFormat(
    user,
    resourceName,
    action
  );
  logger.info(
    { type, currentUser: getUserLogFormat(user), [resourceName]: resource },
    activityMessage
  );
}

const activityLogger = {
  log
};

export default activityLogger;
