import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { DynamicReportTemplateStatic } from '../../types/dynamic-report-template';

import { modelOptions, attributes } from './dynamic-report-template.model.attributes';

function DynamicReportTemplateModelFactory(sequelize: Sequelize): DynamicReportTemplateStatic {
  return sequelize.define(
    'DynamicReportTemplate',
    attributes,
    modelOptions
  ) as DynamicReportTemplateStatic;
}

const DynamicReportTemplate = DynamicReportTemplateModelFactory(db);

export default DynamicReportTemplate;
