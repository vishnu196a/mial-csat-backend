import listSubCategoryrouterOpts from './sub-categories-list.router-option';
import updateSubCategoryRouterOpts from './sub-category-update.router.option';
import SubCategoryDetailRouterOpts from './sub-category-detail.router.option';
import deleteSubCategoryRouterOpts from './sub-categories-delete.router-option';
import createSubCategoryRouterOpts from './sub-categories-create.router.option';
import uploadBulkSubCategoryRouterOpts from './sub-categories-bulk-upload.router-option';
import getIdsAndNamesSubCategoryRouterOpts from './sub-categories-get-ids-names.router.option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  canAdd,
  canView,
  canUpdate,
  canDelete
} from '../../hooks/category-policy.hooks';
import {
  listAll,
  bulkUpload,
  addSubCategory,
  listSubCategory,
  deleteSubCategory,
  detailSubCategory,
  updateSubCategory
} from '../../controllers/v1/sub-categories.controller';

function subCategoryPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/categories/:category_id/sub_categories',
    schema: createSubCategoryRouterOpts,
    preHandler: canAdd,
    handler: addSubCategory,
  });

  fastify.route({
    method: 'GET',
    url: '/v1/categories/:category_id/sub_categories',
    schema: listSubCategoryrouterOpts,
    preHandler: canView,
    handler: listSubCategory
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/categories/:category_id/sub_categories/:id',
    schema: updateSubCategoryRouterOpts,
    preHandler: canUpdate,
    handler: updateSubCategory,
  });

  fastify.route({
    method: 'GET',
    url: '/v1/categories/:category_id/sub_categories/:id',
    schema: SubCategoryDetailRouterOpts,
    preHandler: canUpdate,
    handler: detailSubCategory,
  });

  fastify.route({
    method:'DELETE',
    url:'/v1/categories/:category_id/sub_categories/:id',
    schema: deleteSubCategoryRouterOpts,
    preHandler: canDelete,
    handler: deleteSubCategory
  });

  fastify.route({
    method: 'POST',
    url: '/v1/categories/:category_id/sub_categories/bulk_upload',
    schema:uploadBulkSubCategoryRouterOpts,
    preHandler: canAdd,
    handler: bulkUpload
  });

  fastify.route({
    method: 'GET',
    url: '/v1/categories/:category_id/sub_categories/names_and_ids',
    schema: getIdsAndNamesSubCategoryRouterOpts,
    preHandler: canView,
    handler: listAll
  });

  next();
}

export default subCategoryPrivateRoutes;
