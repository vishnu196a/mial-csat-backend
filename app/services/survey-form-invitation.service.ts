import nanoid from 'nanoid';
import { EmptyResultError } from 'sequelize';

import { map, size } from 'lodash';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { columnSearchQuery, globalSearchQuery } from '../queries/survey-form-invitation';

import {
  User,
  Agent,
  SurveyForm,
  SurveyFormResponse,
  SurveyFormInvitation,
} from '../models';

import {
  Q_MINIMUM_SIZE,
  SURVEY_FORM_INVITATAION_STATUS,
  SURVEY_FORM_INVITATION_TYPE
} from '../config/constants';

import {
  UserInstance,
  SurveyFormInvitationParams,
  SurveyFormInvitationInstance,
  SurveyFormInvitationCreateParams,
  SurveyFormInvitationListQueryParams
} from '../types';

function getSurveyForminvitationById(id: number) {
  return SurveyFormInvitation.findOne({
    where: { id }, include: [
      {
        as: 'survey_form',
        model: SurveyForm,
        attributes: ['id', 'name']
      },
    ]
  })
    .then((surveyInvitation) => {
      if (!surveyInvitation) {
        throw new EmptyResultError('Survey form invitaion not found');
      }
      return surveyInvitation;
    });
}

async function checkInvitationSentStatus(attrs, surveyFormId, type) {
  console.log("contact", attrs.contact);

  const isAlreadySent = await SurveyFormInvitation.findOne({
    where: {
      type,
      call_id: attrs.call_id,
      contact: attrs.contact,
      survey_form_id: surveyFormId
    }
  });

  if (isAlreadySent) {
    throw new Error('Survey form invitation already sent');
  }
}

async function createInvitation(attrs: SurveyFormInvitationCreateParams) {
  try {
    const surveyInvitation = await SurveyFormInvitation.create({
      type: attrs.type,
      user_id: attrs.user_id,
      call_id: attrs.call_id,
      contact: attrs.contact,
      survey_form_id: attrs.survey_form_id,
      invitation_url: attrs.invitation_url,
      status: SURVEY_FORM_INVITATAION_STATUS.sent,
    });
    return surveyInvitation;
  } catch (error) {
    throw error;
  }
}

async function verifyAndSendInvitation(
  token: string,
) {
  if (!token) throw new Error('Invalid invitation');

  const invitationUrl = `${process.env.SURVEY_FORM_INVITATION_URL}?t=${token}`;
  const surveyFormInvitation = await SurveyFormInvitation.findOne({
    where: { invitation_url: invitationUrl }
  });
  if (!surveyFormInvitation) throw new EmptyResultError('Invitation not found');

  const existingSurveyFormResponse = await SurveyFormResponse.findOne({
    where: {
      survey_form_id: surveyFormInvitation.survey_form_id,
      survey_form_invitation_id: surveyFormInvitation.id
    }
  });
  if (existingSurveyFormResponse) throw new Error('Reponse already submitted');

  const surveyForm = await SurveyForm.findOne({
    where: { is_active: true, id: surveyFormInvitation.survey_form_id }
  });
  if (!surveyForm) throw new EmptyResultError('Survey Form not found');

  const user = await surveyForm.getUser({ paranoid: false });
  return {
    name: surveyForm.name,
    questions: surveyForm.questions,
    created_at: surveyForm.created_at,
    updated_at: surveyForm.updated_at,
    created_by_id: surveyForm.created_by,
    survey_form_id: surveyForm.id,
    created_by_name: user.name,
    survey_form_invitation_id: surveyFormInvitation.id
  };
}

async function filterAndPaginate(query: SurveyFormInvitationListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return SurveyFormInvitation.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['created_at', 'DESC']],
    include: [
      {
        as: 'survey_form',
        model: SurveyForm,
        attributes: ['id', 'name']
      },
      {
        as: 'users',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      },
    ]
  }).then((surveyInvitation) => {
    const surveyFormInvitationList = map(
      surveyInvitation.rows, (row: SurveyFormInvitationInstance) => {
        const data = {
          id: row.id,
          survey_form_id: row.survey_form_id,
          survey_form_name: row.survey_form.name,
          call_id: row.call_id,
          type: row.type,
          status: row.status,
          contact: row.contact,
          invitation_url: row.invitation_url,
          resent_by_name: row.users?.name,
          created_at: row.created_at,
          updated_at: row.updated_at
        };
        return data;
      });

    const rowsAndCounts = { count: surveyInvitation.count, rows: surveyFormInvitationList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'survey_form_invitations');
  });
}

async function surveyFormInvitationDetail(id: number) {
  const surveyInvitation = await getSurveyForminvitationById(id);

  const invitationData = {
    id: surveyInvitation.id,
    call_id: surveyInvitation.call_id,
    type: surveyInvitation.type,
    status: surveyInvitation.status,
    contact: surveyInvitation.contact,
    created_at: surveyInvitation.created_at,
    updated_at: surveyInvitation.updated_at,
    invitation_url: surveyInvitation.invitation_url,
    survey_form_id: surveyInvitation.survey_form_id,
    survey_form_name: surveyInvitation.survey_form.name
  };
  return invitationData;
}

async function createSurveyFormInvitationUrl(
  attrs: SurveyFormInvitationParams
) {
  try {
    const surveyForm = await SurveyForm.findOne({ where: { is_active: true } });

    if (surveyForm) {
      await checkInvitationSentStatus(attrs, surveyForm.id, SURVEY_FORM_INVITATION_TYPE.mobile);

      const agent = await Agent.findByPk(attrs.agent_id);
      if (!agent) throw new Error('Agent id not found');

      const user = await User.findOne({ where: { agent_code: agent.number } });
      if (!user) throw new Error('Agent not found');

      const token = nanoid.nanoid(10);
      return `${process.env.SURVEY_FORM_INVITATION_URL}?t=${token}`;

    }
    throw new EmptyResultError('Survey Form not found');
  } catch (error) {
    console.log({ error });

    throw error;
  }
}


async function resentInvitation(id: number, currentUser: UserInstance) {
  const currentInvitation = await SurveyFormInvitation.findOne({ where: { id } });
  if (!currentInvitation) throw new EmptyResultError('Survey form invitation not found');

  return currentInvitation.update({
    resent_at: new Date(),
    resent_by_id: currentUser.id
  });
}


export {
  createInvitation,
  resentInvitation,
  filterAndPaginate,
  verifyAndSendInvitation,
  surveyFormInvitationDetail,
  createSurveyFormInvitationUrl
};
