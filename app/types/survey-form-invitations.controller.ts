export interface SurveyFormInvitationParams {
  call_id: number;
  contact: string;
  agent_id: number;
}

export interface SurveyFormInvitationCreateParams {
  type: string;
  call_id: number;
  contact: string;
  agent_id: number;
  user_id: bigint;
  survey_form_id: bigint;
  invitation_url: string;
}

export interface SurveyFormInvitationMobileParams {
  call_id: number;
  contact: string;
  agent_id: number;
}

export interface GetSurveyInvitationParams {
  id: bigint;
}
