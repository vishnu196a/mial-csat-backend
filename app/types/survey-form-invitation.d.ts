import { UserInstance } from './user';
import { SurveyFormInstance } from './survey-form';
import { Model, BuildOptions } from 'sequelize';

export interface SurveyFormInvitationAttributes {
  id: bigint;
  type: string;
  status: string;
  user_id: bigint;
  call_id: number;
  contact: string;
  resent_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  resent_by_id: bigint;
  invitation_url: string;
  survey_form_id: bigint;
}

export interface SurveyFormInvitationListQueryParams {
  q?: string;
  page?: number;
  type?: string;
  contact?: string;
  call_id?: number;
  per_page?: number;
  resent_by_name?: string;
  survey_form_name?: string;
}

export type SurveyFormInvitationCreateAttributes = Pick<
  SurveyFormInvitationAttributes,
  'survey_form_id'
  | 'type'
  | 'user_id'
  | 'call_id'
  | 'status'
  | 'contact'
  | 'invitation_url'
>;

export interface SurveyFormInvitationInstance
  extends Model<SurveyFormInvitationAttributes, SurveyFormInvitationCreateAttributes>,
  SurveyFormInvitationAttributes {
    survey_form: SurveyFormInstance
    users: UserInstance
   }

export type SurveyFormInvitationyStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): SurveyFormInvitationInstance;
};
