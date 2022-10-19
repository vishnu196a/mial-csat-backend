import { DownloadQueueInstance } from '../../types';

export function isValidPayload(
  this: DownloadQueueInstance,
  payload: object,
  next: (err?: string) => void
) {
  if (!Object.keys(payload).length) return next('Report columns should be present');
  next();
}
