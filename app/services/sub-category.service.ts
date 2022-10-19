import util from 'util';
import db from '../config/database';
import readXlsxFile from 'read-excel-file/node';

import { pipeline } from 'stream';
import { SubCategory } from '../models';
import { EmptyResultError } from 'sequelize';
import { BulkUploadError } from '../exceptions';
import { size, map, isEqual, some } from 'lodash';
import { createWriteStream, unlinkSync } from 'fs';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { columnSearchQuery, globalSearchQuery } from '../queries/sub-category';

import {
  Q_MINIMUM_SIZE,
  SUB_CATEGORY_BULK_UPLOAD_HEADERS
} from '../config/constants';
import {
  UserInstance,
  SubCategoryInstance,
  AddSubCategoryParams,
  SubCategoryRowsAndCount,
  SubCategoryUpdateParams,
  SubCategoryListQueryParams,
} from '../types';
const pump = util.promisify(pipeline);

function getSubCategoryById(id: number, category_id: number) {
  return SubCategory.findOne({ where: { id, category_id } }).then(
    (subCategory: SubCategoryInstance | null) => {
      if (!subCategory) {
        throw new EmptyResultError('Sub Category not found');
      }
      return subCategory;
    }
  );
}

async function add(
  attrs: AddSubCategoryParams,
  currentUser: UserInstance,
  categoryId: number
) {
  const user_id = currentUser.id;
  const SubcategoryCreateAttr = {
    ...attrs,
    created_by: user_id,
    category_id: categoryId,
  };
  const subCategory = await SubCategory.create(SubcategoryCreateAttr);
  const category = await subCategory.getCategory({ paranoid: false });
  const subCategoryData = {
    category_id: category.id,
    category_name: category.name,
    sub_category_id: subCategory.id,
    sub_category_name: subCategory.name,
    sub_category_created_at: subCategory.created_at,
  };
  return subCategoryData;
}

async function filterAndPaginate(
  query: SubCategoryListQueryParams,
  category_id: number,
) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = Number(perPage);
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return SubCategory.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery, category_id },
    order: [['name', 'ASC']],
  }).then((subCategory: SubCategoryRowsAndCount) => {
    const subCategoryList = map(subCategory.rows, (row: SubCategoryInstance) => {
      const data = {
        id: row.id,
        name: row.name,
        created_by: row.created_by,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
      return data;
    });
    const rowsAndCounts = { count: subCategory.count, rows: subCategoryList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'sub_categories');
  });
}

async function update(
  id: number,
  categoryId: number,
  currentUser: UserInstance,
  attrs: SubCategoryUpdateParams
) {
  const subCategory = await getSubCategoryById(id, categoryId);
  attrs.updated_by = currentUser.id;
  const updatedSubCategory = await subCategory.update(attrs);
  const category = await updatedSubCategory.getCategory({ paranoid: false });
  const subCategoryData = {
    category_id: category.id,
    category_name: category.name,
    sub_category_id: subCategory.id,
    sub_category_name: subCategory.name,
    sub_category_created_at: subCategory.created_at,
  };
  return subCategoryData;
}

async function subCategoryDelete(id: number, categoryId: number) {
  const t = await db.transaction();
  try {
    const subCategory = await getSubCategoryById(id, categoryId);
    const deletedSubCategory = await subCategory.destroy({ transaction: t });
    await t.commit();
    return deletedSubCategory;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function detail(id: number, categoryId: number) {
  try {
    const subCategory = await getSubCategoryById(id, categoryId);
    return subCategory;
  } catch (error) {
    throw error;
  }
}

async function bulkUpload(attrs, currentUser: UserInstance, categoryId) {
  const { mimetype: fileType } = attrs;

  if (!(fileType.includes('excel') || fileType.includes('spreadsheetml'))) {
    throw new Error('Kindly upload only excel file');
  }

  const fileName = `${new Date().getTime()}.xls`;
  const filePath = `${__dirname}/../assets/sub-categories/${fileName}`;

  const t = await db.transaction();

  try {
    await pump(attrs.file, createWriteStream(filePath));

    const subCategoryList = await readXlsxFile(filePath);

    if (!(size(subCategoryList) > 1)) {
      throw new Error('Kindly provide sub category data');
    }

    const bulkUpdloadHeaders = SUB_CATEGORY_BULK_UPLOAD_HEADERS;
    const subCategoryListHeaders = subCategoryList[0];

    if (!isEqual(bulkUpdloadHeaders, subCategoryListHeaders)) {
      throw new Error(
        'Invalid template in excel file. Kindly upload the file with valid column name'
      );
    }

    subCategoryList.shift();
    const subCategoryData: any[] = [];
    const allSubCategories = map(subCategoryList, async (row, index: number) => {
      const rowNumber = index + 1;
      const name = row[0];

      if (!name) {
        throw new Error(`Sub category should be present for row: ${rowNumber}`);
      }
      const existingName = some(subCategoryData, {
        name,
      });

      const attributes = {
        name,
        created_by: currentUser.id,
        category_id: categoryId
      };
      if (existingName) {
        throw new Error(`Name should be unique for row: ${rowNumber}`);
      }

      subCategoryData.push(attributes);
      try {
        const subCategories = await SubCategory.create(attributes, { transaction: t });
        return subCategories;
      } catch (error) {
        throw new BulkUploadError(rowNumber, error);
      }
    });
    await Promise.all(allSubCategories);
    await t.commit();
    unlinkSync(filePath);
  } catch (error) {
    await t.rollback();
    unlinkSync(filePath);
    throw error;
  }
}

async function listAllSubCategories(categoryId: number) {
  try {
    const subCategories = await SubCategory
      .findAll({ where: { category_id: categoryId }, attributes: ['id', 'name'] });
    return subCategories;
  } catch (error) {
    throw error;
  }
}

export {
  add,
  update,
  detail,
  bulkUpload,
  subCategoryDelete,
  filterAndPaginate,
  getSubCategoryById,
  listAllSubCategories
};
