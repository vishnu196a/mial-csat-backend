import activityLogger from '../../config/activity-logger';
import { BulkUploadError } from '../../exceptions';
import { ValidationError } from 'sequelize';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';

import {
  AddCategoryParams,
  CategoryUpdateParams,
  CategoryListQueryParams,
} from '../../types/categories.controller';
import {
  add,
  update,
  categoryDetail,
  categoryDelete,
  filterAndPaginate,
  listAllCategories,
  bulkUpload as categoryBulkUpload,
} from '../../services/category.service';

function addCategory(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddCategoryParams;
  const currentUser = req.currentUser;
  add(params, currentUser)
    .then((category) => {
      activityLogger.log(currentUser, category, 'category', 'created');
      reply.code(201).send(category);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as CategoryListQueryParams;
  filterAndPaginate(query, req.currentUser)
    .then((categories) => {
      reply.code(200).send(categories);
    })
    .catch((err: FastifyError) => {
      reply.send(err);
    });
}

function updateCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const attrs = req.body as CategoryUpdateParams;
  const currentUser = req.currentUser;
  update(id, currentUser, attrs)
    .then((category) => {
      activityLogger.log(currentUser, category, 'category', 'updated');
      reply.code(200).send(category);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function deleteCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  categoryDelete(id)
    .then(() => {
      activityLogger.log(req.currentUser, { id }, 'category', 'created');
      reply.send({ message: 'Category deleted successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

function detailCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  categoryDetail(id)
    .then((category) => {
      reply.send(category);
    })
    .catch((err: FastifyError) => {
      reply.send(err);
    });
}

async function bulkUpload(req: FastifyRequest, reply: FastifyReply) {
  const attrs = await req.file();
  const { currentUser } = req;
  categoryBulkUpload(attrs, currentUser)
    .then(() => {
      reply.code(201).send({ message: 'Category created successfully' });
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError || error instanceof BulkUploadError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function listAll(req: FastifyRequest, reply: FastifyReply) {
  listAllCategories()
    .then((categories) => {
      reply.code(200).send(categories);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export {
  list,
  listAll,
  bulkUpload,
  addCategory,
  updateCategory,
  deleteCategory,
  detailCategory
};
