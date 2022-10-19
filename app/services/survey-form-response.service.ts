import db from '../config/database';

import { map, size, forEach } from 'lodash';
import { Q_MINIMUM_SIZE, SURVEY_FORM_INVITATAION_STATUS } from '../config/constants';
import { EmptyResultError } from 'sequelize';

import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery } from '../queries/survey-form-response';

import {
  SurveyForm,
  SurveyFormResponse,
  SurveyFormInvitation,
  User
} from '../models';
import {
  Response,
  SurveyFormResponseInstance,
  SurveyFormResponseRowsAndCount,
  SurveyFormResponseListQueryParams,
  AddSurveyFormResponseParams
} from '../types';

async function filterAndPaginate(query: SurveyFormResponseListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return SurveyFormResponse.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['created_at', 'DESC']],
    include: [
      {
        as: 'user',
        model: User,
        paranoid: false,
        attributes: ['id', 'name'],
      },
      {
        as: 'survey_form',
        model: SurveyForm,
        paranoid: false,
        attributes: ['id', 'name']
      },
      {
        as: 'survey_form_invitation',
        model: SurveyFormInvitation,
        paranoid: false,
        attributes: ['id']
      }
    ],
  }).then((surveyFormResponses: SurveyFormResponseRowsAndCount) => {
    const surveyFormResponseList = map(
      surveyFormResponses.rows,
      (row: SurveyFormResponseInstance) => {
        const data = {
          id: row.id,
          score: row.score,
          user_id: row.user.id,
          user_name: row.user.name,
          created_at: row.created_at,
          updated_at: row.updated_at,
          survey_form_id: row.survey_form.id,
          survey_form_name: row.survey_form.name,
          survey_form_invitation_id: row.survey_form_invitation.id
        };
        return data;
      });
    const rowsAndCounts = { count: surveyFormResponses.count, rows: surveyFormResponseList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'survey_form_responses');
  });
}

function getSurveyFormResponseById(id: number) {
  return SurveyFormResponse.findByPk(id)
    .then((result: SurveyFormResponseInstance | null) => {
      if (!result) {
        throw new EmptyResultError('Survey Form Response not found');
      }
      return result;
    });
}

async function detail(id: number) {
  try {
    const surveyFormResponse = await getSurveyFormResponseById(id);
    const surveyForm = await SurveyForm.findByPk(Number(surveyFormResponse.survey_form_id));

    const surveyFormResponseData = {
      ...surveyFormResponse.toJSON(),
      survey_form_id: surveyForm?.id,
      survey_form_name: surveyForm?.name
    };
    return surveyFormResponseData;
  } catch (error) {
    throw error;
  }
}

function frameDependentReport(attrs) {
  const report = map(attrs, (dependentQues) => {
    if (dependentQues.type === 'Ratings' && dependentQues.ratings) {
      const result = {
        rating: Number(dependentQues.ratings),
        question: dependentQues.question,
        max_score: dependentQues.max_score,
        percentage: Number(dependentQues.ratings / Number(dependentQues.max_score)) * 100
      };
      return result;
    }
  });
  return report;
}

function frameReport(attrs: AddSurveyFormResponseParams) {
  const report = map(attrs.responses, (response: Response) => {
    if (
      response.type === 'Options'
        && response.dependent_questions !== null
      ) {
      const result = {
        rating: null,
        answer: null,
        question: response.question,
        max_score: response.max_score,
        percentage: 0,
        dependent_questions: frameDependentReport(response.dependent_questions),
        getPercentage (this: Response) {
          const getDepQuesRatings = this.dependent_questions.map(item => item.rating);
          const calcPercentage = (Number(
            (getDepQuesRatings.reduce(
              (parSum, item) => parSum + item, 0
            )) / (getDepQuesRatings.length)
          ) / Number(this.max_score)) * 100;
          return calcPercentage;
        }
      };
      result.percentage = result.getPercentage();
      return result;
    }

    if (
      response.type === 'Multi Select'
        && response.dependent_questions !== null
      ) {
      const result = {
        rating: null,
        answer: null,
        question: response.question,
        max_score: response.max_score,
        percentage: 0,
        dependent_questions: frameDependentReport(response.dependent_questions),
        getPercentage (this: Response) {
          const getDepQuesRatings = this.dependent_questions.map(item => item.rating);
          const calcPercentage = (Number(
            (getDepQuesRatings.reduce(
              (parSum, item) => parSum + item, 0
            )) / (getDepQuesRatings.length)
          ) / Number(this.max_score)) * 100;
          return calcPercentage;
        }
      };
      result.percentage = result.getPercentage();
      return result;
    }

    if (response.type === 'Free Text') {
      return {
        rating: null,
        answer: response.answer,
        question: response.question,
        max_score: null,
        percentage: 0,
        option_rating: null,
        dependent_questions: null
      };
    }

    if (response.type === 'Options') {
      return {
        rating: null,
        answer: null,
        question: response.question,
        max_score: response.max_score,
        percentage: Number(
          Number(response.option_rating)
            / Number(response.max_score)
          ) * 100,
        option_rating: response.option_rating,
        dependent_questions: null
      };
    }

    if (response.type === 'Ratings' && response.rating) {
      return {
        rating: response.rating,
        answer: null,
        question: response.question,
        max_score: response.max_score,
        percentage: Number(response.rating / Number(response.max_score)) * 100,
        option_rating: null,
        dependent_questions: null
      };
    }

    if (response.type === 'Multi Select' && response.multi_option_rating) {
      return {
        rating: null,
        answer: null,
        question: response.question,
        max_score: response.max_score,
        percentage: Number((
          Number((response.multi_option_rating.reduce(
            (parSum, item) => parSum + item, 0)
          ) / response.multi_option_rating.length)
          ) / Number(response.max_score)) * 100,
        option_rating: response.multi_option_rating,
        dependent_questions: null
      };
    }
  });
  return {
    report,
    score: calcOverallScore(report)
  };
}

function calcOverallScore(attrs: object[]) {
  const filterData = attrs.filter((item: any) => item.percentage !== 0);
  const totalPercentage = filterData.reduce(
    (parSum, item: any) => parSum + Number(item.percentage), 0
  );
  return totalPercentage / filterData.length;
}

async function add(attrs: AddSurveyFormResponseParams) {
  const t = await db.transaction();
  try {
    const existingSurveyFormResponse = await SurveyFormResponse.findOne({
      where: {
        survey_form_id: attrs.survey_form_id,
        survey_form_invitation_id: attrs.survey_form_invitation_id
      }
    });
    const surveyForm = await SurveyForm.findOne({
      where: { id: attrs.survey_form_id }
    });
    const surveyFormInvitation = await SurveyFormInvitation.findOne({
      where: { id: attrs.survey_form_invitation_id }
    });

    if (existingSurveyFormResponse) throw new Error('Reponse already submitted');
    if (!surveyForm) throw new Error('Invalid survey form');
    if (!surveyFormInvitation) throw new Error('Invalid survey form invitation');

    await surveyFormInvitation.update(
      { status: SURVEY_FORM_INVITATAION_STATUS.responded },
      { transaction: t });
    const data: object = frameReport(attrs);
    const surveyFormResponse = await SurveyFormResponse.create(
      {
        ...attrs,
        user_id: surveyFormInvitation.user_id,
        score: data['score'], // tslint:disable-line
        report: data['report'], // tslint:disable-line
      }, { transaction: t } // tslint:disable-line
    );

    await t.commit();
    return surveyFormResponse;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

export { add, detail, filterAndPaginate };
