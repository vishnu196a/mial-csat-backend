import { SurveyFormResponseInstance } from "./survey-form-response";

export interface SurveyFormResponseListQueryParams {
  q?: string;
  page?: number;
  score?: number;
  per_page?: number;
  user_name?: string;
  survey_form_name?: string;
}

export interface SurveyFormResponseRowsAndCount {
  count: number;
  rows: SurveyFormResponseInstance[];
}

export interface Response {
  type?: string;
  rating?: number | null;
  option?: string | null;
  answer?: string | null;
  question?: string;
  max_score?: number | null;
  multi_select?: string[] | null;
  option_rating?: number | null;
  dependent_questions?: any;
  multi_option_rating?: number[] | null;
}

export interface AddSurveyFormResponseParams {
  responses: Response[];
  survey_form_id: bigint;
  survey_form_invitation_id: bigint;
}
