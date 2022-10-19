import util from 'util';
import { pipeline } from 'stream';
import db from '../config/database';
import { EmptyResultError } from 'sequelize';
import readXlsxFile from 'read-excel-file/node';
import { BulkUploadError } from '../exceptions';
import { Category, SubCategory } from '../models';
import { unlinkSync, createWriteStream } from 'fs';
import { map, size, isEqual, some } from 'lodash';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { globalSearchQuery, columnSearchQuery } from '../queries/category';
import { CATEGORY_BULK_UPLOAD_HEADERS, Q_MINIMUM_SIZE } from '../config/constants';
import {
  UserInstance,
  CategoryInstance,
  AddCategoryParams,
  CategoryUpdateParams,
  CategoryRowsAndCount,
  CategoryListQueryParams,
} from '../types';

const pump = util.promisify(pipeline);

async function getCategoryById(id: number) {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new EmptyResultError('Category not found');
  }
  return category;
}

async function add(
  attrs: AddCategoryParams,
  currentUser: UserInstance
): Promise<CategoryInstance> {
  const id = currentUser.id;
  const categoryCreateAttr = {
    ...attrs,
    created_by: id,
  };
  return Category.create(categoryCreateAttr);
}

async function filterAndPaginate(query: CategoryListQueryParams, user: UserInstance) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = Number(perPage);
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return Category.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['name', 'ASC']],
  }).then((category: CategoryRowsAndCount) => {
    const categoryList = map(category.rows, (row: CategoryInstance) => {
      const data = {
        id: row.id,
        name: row.name,
        created_by: row.created_by,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
      return data;
    });
    const rowsAndCounts = { count: category.count, rows: categoryList };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'categories');
  });
}

async function update(
  id: number,
  currentUser: UserInstance,
  attrs: CategoryUpdateParams
) {
  try {
    const category = await getCategoryById(id);
    attrs.updated_by = currentUser.id;
    const updatedCategory = await category.update(attrs);
    return updatedCategory;
  } catch (error) {
    throw error;
  }
}

async function categoryDelete(id: number) {
  const t = await db.transaction();
  try {
    const category = await getCategoryById(id);
    const deletedCategory = await category.destroy({ transaction: t });
    await t.commit();
    return deletedCategory;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function categoryDetail(id: number) {
  const category = await Category.findOne({
    where: { id },
    include: {
      as: 'sub_categories',
      model: SubCategory,
      paranoid: false
    },
  });
  if (!category) {
    throw new EmptyResultError('Category not found');
  }
  return category;
}

async function bulkUpload(attrs, currentUser: UserInstance) {
  const { mimetype: fileType } = attrs;

  if (!(fileType.includes('excel') || fileType.includes('spreadsheetml'))) {
    throw new Error('Kindly upload only excel file');
  }

  const fileName = `${new Date().getTime()}.xls`;
  const filePath = `${__dirname}/../assets/categories/${fileName}`;

  const t = await db.transaction();

  try {
    await pump(attrs.file, createWriteStream(filePath));

    const categoryList = await readXlsxFile(filePath);

    if (!(size(categoryList) > 1)) {
      throw new Error('Kindly provide category data');
    }

    const bulkUpdloadHeaders = CATEGORY_BULK_UPLOAD_HEADERS;
    const categoryListHeaders = categoryList[0];

    if (!isEqual(bulkUpdloadHeaders, categoryListHeaders)) {
      throw new Error(
        'Invalid template in excel file. Kindly upload the file with valid column name'
      );
    }

    categoryList.shift();
    const categoryData: any[] = [];
    const allCategories = map(categoryList, async (row, index: number) => {
      const rowNumber = index + 1;
      const name = row[0];

      if (!name) {
        throw new Error(`Category should be present for row: ${rowNumber}`);
      }
      const existingName = some(categoryData, {
        name,
      });

      const attributes = {
        name,
        created_by: currentUser.id,
      };
      if (existingName) {
        throw new Error(`Name should be unique for row: ${rowNumber}`);
      }

      categoryData.push(attributes);
      try {
        const categories = await Category.create(attributes, { transaction: t });
        return categories;
      } catch (error) {
        throw new BulkUploadError(rowNumber, error);
      }
    });
    await Promise.all(allCategories);
    await t.commit();
    unlinkSync(filePath);
  } catch (error) {
    await t.rollback();
    unlinkSync(filePath);
    throw error;
  }
}

async function listAllCategories() {
  try {
    const categories = await Category.findAll({ attributes: ['id', 'name'] });
    return categories;
  } catch (error) {
    throw error;
  }
}

export {
  add,
  update,
  bulkUpload,
  categoryDetail,
  categoryDelete,
  getCategoryById,
  listAllCategories,
  filterAndPaginate,
};
