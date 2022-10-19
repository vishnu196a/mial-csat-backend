import listCategoryRouterOpts from './categories-list.router-option';
import updateCategoryRouterOpts from './category-update.router.option';
import deleteCategoryRouterOpts from './categories-delete.router-option';
import detailCategoryRouterOpts from './categories-detail.router-option';
import createCategoryRouterOpts from './categories-create.router-option';
import uploadBulkCategoryRouterOpts from './categories-bulk-upload.router-option';
import getIdsAndNamesCategoryRouterOpts from './categories-get-ids-names.router.option';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { canAdd, canView, canUpdate, canDelete } from '../../hooks/category-policy.hooks';

import {
  list,
  listAll,
  bulkUpload,
  addCategory,
  updateCategory,
  deleteCategory,
  detailCategory
 } from '../../controllers/v1/categories.controller';

function categoryPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/v1/categories',
    schema: createCategoryRouterOpts,
    preHandler: canAdd,
    handler: addCategory,
  });

  fastify.route({
    method: 'GET',
    url: '/v1/categories',
    schema: listCategoryRouterOpts,
    preHandler: canView,
    handler: list
  });

  fastify.route({
    method: 'PUT',
    url: '/v1/categories/:id',
    schema: updateCategoryRouterOpts,
    preHandler: canUpdate,
    handler: updateCategory
  });

  fastify.route({
    method: 'DELETE',
    url: '/v1/categories/:id',
    schema: deleteCategoryRouterOpts,
    preHandler: canDelete,
    handler: deleteCategory
  });

  fastify.route({
    method:'GET',
    url:'/v1/categories/:id',
    schema: detailCategoryRouterOpts,
    preHandler:canView,
    handler:detailCategory
  });

  fastify.route({
    method: 'POST',
    url: '/v1/categories/bulk_upload',
    schema: uploadBulkCategoryRouterOpts,
    preHandler: canAdd,
    handler: bulkUpload
  });

  fastify.route({
    method: 'GET',
    url: '/v1/categories/names_and_ids',
    schema: getIdsAndNamesCategoryRouterOpts,
    preHandler: canView,
    handler: listAll
  });

  next();
}

export default categoryPrivateRoutes;
