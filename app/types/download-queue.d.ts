import { UserInstance } from './user';
import {
  Model,
  BuildOptions,
} from 'sequelize';

export interface DownloadQueueAttributes {
  id: bigint;
  name: string;
  type?: string;
  status: string;
  payload: object;
  report_download_path: string;
  user_id: bigint;
  retry_count: number;
  error: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type DownloadQueueCreateAttributes = Pick<
  DownloadQueueAttributes,
  'name' | 'user_id' | 'payload'| 'type'
>;

export interface DownloadQueueInstance
  extends Model<DownloadQueueAttributes, DownloadQueueCreateAttributes>,
  DownloadQueueAttributes {
    user: UserInstance;
  }

export type DownloadQueueStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DownloadQueueInstance;
};
