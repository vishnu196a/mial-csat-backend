import { DownloadQueueInstance } from "./";

export interface DownloadQueueListQueryParams {
  q?: string;
  page?: number;
  name?: string;
  status?: string;
  per_page?: number;
  user_name?: string;
}

export interface DownloadQueueRowsAndCount {
  count: number;
  rows: DownloadQueueInstance[];
}

export interface AddDownloadQueueParams {
  name: string;
  payload: object
}
