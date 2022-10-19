import { SurveyFormInstance } from './survey-form';
import { SurveyFormInvitationInstance } from './survey-form-invitation';

import { Model, BuildOptions, BelongsToGetAssociationMixin } from 'sequelize';
import { Response } from './survey-form-responses.controller';
import { UserInstance } from './user';

export interface SurveyFormResponseAttributes {
  id: bigint;
  score: number;
  report: object[]; 
  user_id: bigint;
  responses: Response[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  survey_form_id: bigint;
  survey_form_invitation_id: bigint;
}

export type SurveyFormResponseCreationAttributes = Pick<
SurveyFormResponseAttributes,
  'user_id' | 'survey_form_id' | 'responses' |
  'score' | 'report' |'survey_form_invitation_id'
>;

export interface SurveyFormResponseInstance
  extends Model<SurveyFormResponseAttributes, SurveyFormResponseCreationAttributes>,
  SurveyFormResponseAttributes {
  user: UserInstance;
  survey_form: SurveyFormInstance;
  survey_form_invitation: SurveyFormInvitationInstance;

  getUser: BelongsToGetAssociationMixin<UserInstance>;
  getSurveyForm: BelongsToGetAssociationMixin<SurveyFormInstance>;
  getSurveyFormInvitation: BelongsToGetAssociationMixin<SurveyFormInvitationInstance>;
}

export type SurveyFormResponseStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): SurveyFormResponseInstance;
};
