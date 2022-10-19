import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { ManagerReportStatic } from '../../types/manager-report';

import { modelOptions, attributes } from './manager-report.model.attributes';

function ManagerReportModelFactory(sequelize: Sequelize): ManagerReportStatic {
  return sequelize.define(
    'ManagerReport',
    attributes,
    modelOptions
  ) as ManagerReportStatic;
}

const ManagerReport = ManagerReportModelFactory(db);

export default ManagerReport;
