import { UserInstance } from './user';
import {
  Model,
  BuildOptions,
  BelongsToGetAssociationMixin
} from 'sequelize';

export interface DependentQuestion {
  type: string;
  option: string[] | null;
  ratings: string | null;
  question: string;
  multi_select: string[] | null;
}

export interface Question {
  type: string;
  option: string[] | null;
  ratings: string | null;
  question: string;
  multi_select: string[] | null;
  dependent_questions: DependentQuestion[] | null;
}

export interface SurveyFormAttributes {
  id: bigint;
  name: string;
  updated_at: Date;
  created_at: Date;
  created_by: bigint;
  is_active: boolean;
  questions: Question[];
}

export type SurveyformCreateAttributes = Pick<
  SurveyFormAttributes,
  'name' | 'created_by' | 'questions'
>;

export interface SurveyFormInstance
  extends Model<SurveyFormAttributes, SurveyformCreateAttributes>,
  SurveyFormAttributes {
    updated_user: UserInstance;
    user: UserInstance;
    surveyFormResponse: SurveyFormInstance;

    getUser: BelongsToGetAssociationMixin<UserInstance>;
  }

export type SurveyFormStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SurveyFormInstance;
}
