import fs from 'fs';
import { REPORT_COLUMNS } from '../../config/constants';
import { ValidationError } from 'sequelize';

import {
  ChartQueryParams,
  subCategoryQueryParams,
  CategoryReportListQueryParams,
  SubCategoryReportListQueryParams,
  CategoryReportDownloadQueryParams,
  SubCategoryTopThreeListQueryParams,
  SubCategoryReportDownloadQueryParams
} from '../../types/reports.controller';
import {
  FastifyReply,
  FastifyError,
  FastifyRequest
} from 'fastify';
import {
  getCategoryChart,
  getSubCategoryChart,
  getTopThreeSubCategory,
  generateCategoryReport,
  generateSubCategoryReport,
  filterAndPaginateCategory,
  filterAndPaginateSubCategory,
} from '../../services/report.service';

function categoryList(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as CategoryReportListQueryParams;
  filterAndPaginateCategory(query)
    .then((categoryReports) => {
      reply.code(200).send(categoryReports);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function viewCategoryChart(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as ChartQueryParams;
  getCategoryChart(query)
    .then((categoryChartReports) => {
      reply.code(200).send(categoryChartReports);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function subCategoryList(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as SubCategoryReportListQueryParams;
  const { category_id: categoryId } = req.params as { category_id: number };
  filterAndPaginateSubCategory(query, categoryId)
    .then((subCategoryReports) => {
      reply.code(200).send(subCategoryReports);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function viewSubCategoryChart(req: FastifyRequest, reply: FastifyReply) {
  const { category_id: categoryId } = req.params as { category_id: number };
  const query = req.query as subCategoryQueryParams;
  getSubCategoryChart(categoryId, query)
    .then((subCategoryChartReports) => {
      reply.code(200).send(subCategoryChartReports);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function viewTopThreeSubCategoryList(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as SubCategoryTopThreeListQueryParams;
  const { category_id: categoryId } = req.params as { category_id: number };
  getTopThreeSubCategory(query, categoryId)
    .then((subCategoryTopThreeResult) => {
      reply.code(200).send(subCategoryTopThreeResult);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function categoryReportDownload(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as CategoryReportDownloadQueryParams;
  generateCategoryReport(query)
    .then((categoryReportFileName) => {
      fs.readFile(`${categoryReportFileName}`, (err, fileBuffer) => {
        if (fileBuffer) {
          reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          reply.header('Content-Disposition', 'attachment; filename=' + 'call-tag-category-report.xls');
          reply.send(fileBuffer);
        } else {
          reply.send(err);
        }
      });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function subCategoryReportDownload(req: FastifyRequest, reply: FastifyReply) {
  const { category_id: categoryId } = req.params as { category_id: number };
  const query = req.query as SubCategoryReportDownloadQueryParams;
  generateSubCategoryReport(categoryId, query)
    .then((subCategoryReportFileName) => {
      fs.readFile(`${subCategoryReportFileName}`, (err, fileBuffer) => {
        if (fileBuffer) {
          reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          reply.header('Content-Disposition', 'attachment; filename=' + 'call-tag-sub-category-report.xls');
          reply.send(fileBuffer);
        } else {
          reply.send(err);
        }
      });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function columnsList(req: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send(REPORT_COLUMNS);
}

export {
  columnsList,
  categoryList,
  subCategoryList,
  viewCategoryChart,
  viewSubCategoryChart,
  categoryReportDownload,
  subCategoryReportDownload,
  viewTopThreeSubCategoryList
};
