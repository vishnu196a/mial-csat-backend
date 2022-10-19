import { Op } from 'sequelize';

import { SurveyFormStatic, SurveyFormInstance, Question } from '../../types';

export function isNameUnique(
  this: SurveyFormInstance,
  name: string,
  next: (err?: string) => void
) {
  if (name) {
    const model = this.constructor as SurveyFormStatic;
    model
      .findOne({ where: { name: { [Op.like]: name } } })
      .then((result: SurveyFormInstance | null) => {
        if (result) {
          return next('Name should be unique');
        }
        return next();
      })
      .catch((err) => {
        next();
      });
  } else {
    return next('Name should be present');
  }
}

export async function isQuestionUnique(
  this: SurveyFormInstance,
  questionAttrs: Question[],
  next: (err?: string) => void
) {
  if (questionAttrs) {
    const questions: string[] = [];
    questionAttrs.forEach((question: Question) => {
      questions.push(question.question);
    });
    questions.forEach((ques, index) => {
      if (!(questions.indexOf(ques) === index)) {
        return next('Questions should be unique');
      }
    });
    return next();
  }
  return next('Question should be present');
}
