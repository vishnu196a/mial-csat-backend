import { Question, SurveyFormInstance } from './survey-form';

export interface AddSurveyFormParams {
  name: string;
  questions: Question[];
}

export interface SurveyFormListQueryParams {
  q?: string;
  page?: number;
  name?: string;
  per_page?: number;
  created_by_name?: string;
  updated_by_name?: string;
}

export interface SurveyFormReportListQueryParams {
  q?: string;
  page?: number;
  per_page?: number;
  user_name?: string;
}

export interface SurveyFormRowsAndCount {
  count: number;
  rows: SurveyFormInstance[];
}
