import db from '../config/database';
import globalSearchQuery from '../queries/survey-form/survey-form-global-search.query';
import columnSearchQuery from '../queries/survey-form/survey-form-column-search.query';

import { Q_MINIMUM_SIZE } from '../config/constants';
import { Sequelize, EmptyResultError } from 'sequelize';
import { map, size, forEach } from 'lodash';
import { AddSurveyFormParams } from '../types/survey-forms.contreller';

import { User, SurveyForm } from '../models';
import { paginate, paginatorResult } from '../lib/paginator-result';

import {
  UserInstance,
  SurveyFormInstance,
  SurveyFormRowsAndCount,
  SurveyFormListQueryParams,
  SurveyFormReportListQueryParams
} from '../types';

async function getSurveyFormById(id: number) {
  const surveyForm = await SurveyForm.findByPk(id);
  if (!surveyForm) {
    throw new EmptyResultError('Survey form not found');
  }
  return surveyForm;
}

async function add(attrs: AddSurveyFormParams, currentUser: UserInstance) {
  const t = await db.transaction();
  try {
    await SurveyForm.update(
      { is_active: false },
      {
        where: { is_active: true },
        transaction: t,
      }
    );
    const surveyFormCreateAttr = {
      ...attrs,
      created_by: currentUser.id,
    };
    const surveyForm = await SurveyForm.create(surveyFormCreateAttr, { transaction: t });
    await t.commit();
    return surveyForm;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function filterAndPaginate(query: SurveyFormListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = Number(perPage);
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return SurveyForm.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['created_at', 'DESC']],
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'updated_user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      },
    ],
  })
    .then((surveyForms: SurveyFormRowsAndCount) => {
      const surveyFormList = map(surveyForms.rows, (row: SurveyFormInstance) => {
        const data = {
          id: row.id,
          name: row.name,
          is_active: row.is_active,
          created_at: row.created_at,
          updated_at: row.updated_at,
          created_by_id: row.user?.id,
          created_by_name: row.user?.name
        };
        return data;
      });
      const rowsAndCounts = { count: surveyForms.count, rows: surveyFormList };
      const result = paginate(rowsAndCounts, perPage, page);
      return paginatorResult(result, 'survey_forms');
    })
    .catch((error) => {
      throw error;
    });
}

async function update(id: number, currentUser: UserInstance) {
  try {
    const surveyForm = await getSurveyFormById(id);
    if (!surveyForm.is_active) {
      throw new Error('Survey form is already inactive');
    }

    const updateAttrs = {
      is_active: false,
      updated_by: currentUser.id,
    };
    return surveyForm.update(updateAttrs);
  } catch (error) {
    throw error;
  }
}

function detail(id: number) {
  return getSurveyFormById(id);
}

async function getCurrentSurveyFormNamesAndIds() {
  try {
    const surveyForm = await SurveyForm.findOne({
      where: { is_active: true },
      attributes: ['id', 'name'],
    });
    if (!surveyForm) {
      throw new EmptyResultError('Active survey form not found');
    }
    return surveyForm;
  } catch (error) {
    throw error;
  }
}

async function reportList(id: number, query: SurveyFormReportListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = Number(perPage);
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? query.q : '';
  const columnQuery = query.user_name ? query.user_name : '';

  const surveyForm = await db.query(`
    SELECT survey_form_responses.id, survey_form_responses.user_id, survey_form_responses.survey_form_id, SUM(survey_form_responses.score)
    AS total_score, COUNT(survey_form_responses.user_id) AS no_of_feedback, AVG(survey_form_responses.score) AS score_percentage,
    survey_form_responses.created_at, survey_forms.name AS survey_form_name, users.name AS user_name FROM survey_form_responses
    JOIN survey_forms ON survey_form_responses.survey_form_id = survey_forms.id JOIN users ON survey_form_responses.user_id
    = users.id WHERE (survey_form_id=${id} AND ((users.name LIKE '%${queries}%')) AND ((users.name like '%${columnQuery}%')))
    GROUP BY user_id ORDER BY user_name ASC LIMIT ${offset}, ${limit}`);
  const surveyFormResponseCount: any = await db.query(`
    SELECT COUNT(DISTINCT(user_id)) as no_of_users from survey_form_responses WHERE survey_form_id=${id}
  `);

  const rowsAndCount = { count: surveyFormResponseCount[0][0]['no_of_users'], rows: surveyForm[0] }; // tslint:disable-line
  const result = paginate(rowsAndCount, perPage, page);
  return paginatorResult(result, 'survey_form_reports');
}

export {
  add,
  update,
  detail,
  reportList,
  filterAndPaginate,
  getSurveyFormById,
  getCurrentSurveyFormNamesAndIds
};
