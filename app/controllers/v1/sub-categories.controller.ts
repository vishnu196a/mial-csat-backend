import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';
import { BulkUploadError } from '../../exceptions';
import { getCategoryById } from '../../services/category.service';
import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';

import {
  add,
  update,
  detail,
  subCategoryDelete,
  filterAndPaginate,
  listAllSubCategories,
  bulkUpload as subCategoryBulkUpload,
} from '../../services/sub-category.service';
import {
  AddSubCategoryParams,
  SubCategoryUpdateParams,
  SubCategoryListQueryParams,
} from '../../types';

function addSubCategory(req: FastifyRequest, reply: FastifyReply) {
  const { category_id:categoryId } = req.params as { category_id: number };
  const params = req.body as AddSubCategoryParams;
  const currentUser = req.currentUser;
  getCategoryById(categoryId).then((category) => {
    add(params, currentUser, categoryId)
      .then((subCategory) => {
        activityLogger.log(currentUser, subCategory, 'sub category', 'created');
        reply.code(201).send(subCategory);
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  });
}

function listSubCategory(req: FastifyRequest, reply: FastifyReply) {
  const { category_id:categoryId } = req.params as {category_id: number};
  const query = req.query as SubCategoryListQueryParams;
  getCategoryById(categoryId).then(() => {
    filterAndPaginate(query, categoryId)
      .then((subCategories) => {
        reply.code(200).send(subCategories);
      })
      .catch((err: FastifyError) => {
        reply.send(err);
      });
  }).catch((error) => {
    reply.send(error);
  });
}

function updateSubCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id, category_id: categoryId } = req.params as { id: number; category_id: number };
  const attrs = req.body as SubCategoryUpdateParams;
  const currentUser = req.currentUser;
  getCategoryById(categoryId).then(() => {
    update(id, categoryId, currentUser, attrs)
      .then((subCategory) => {
        activityLogger.log(currentUser, subCategory, 'sub category', 'updated');
        reply.code(200).send(subCategory);
      })
      .catch((error: FastifyError) => {
        if (error instanceof ValidationError) {
          reply.send(error);
        } else {
          reply.code(422).send({ errors: [error.message] });
        }
      });
  }).catch((error) => {
    reply.send(error);
  });
}

function deleteSubCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id, category_id: categoryId } = req.params as { id: number; category_id: number };
  getCategoryById(categoryId).then((category) => {
    subCategoryDelete(id, categoryId)
      .then(() => {
        activityLogger.log(req.currentUser, { id }, 'sub category', 'deleted');
        reply.send({ message: 'Sub Category deleted successfully' });
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  }).catch((error) => {
    reply.send(error);
  });
}

function detailSubCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id, category_id: categoryId } = req.params as { id: number; category_id: number };
  getCategoryById(categoryId).then((category) => {
    detail(id, categoryId)
      .then((subCategory) => {
        reply.code(200).send(subCategory);
      })
      .catch((error: FastifyError) => {
        reply.send(error);
      });
  }).catch((error) => {
    reply.send(error);
  });
}

async function bulkUpload(req: FastifyRequest, reply: FastifyReply) {
  const attrs = await req.file();
  const { currentUser } = req;
  const { category_id: categoryId } = req.params as {category_id: number};
  getCategoryById(categoryId).then((category) => {
    subCategoryBulkUpload(attrs, currentUser, category.id)
  .then(() => {
    reply.code(201).send({ message: 'Sub category created successfully' });
  })
  .catch((error: FastifyError) => {
    if (
      error instanceof ValidationError ||
      error instanceof BulkUploadError
    ) {
      reply.send(error);
    } else {
      reply.code(422).send({ errors: [error.message] });
    }
  });
  }).catch((error) => {
    reply.send(error);
  });
}

function listAll(req: FastifyRequest, reply: FastifyReply) {
  const { category_id: categoryId } = req.params as {category_id: number};
  getCategoryById(categoryId).then((category) => {
    listAllSubCategories(categoryId).then((subCategories) => {
      reply.code(200).send(subCategories);
    })
  .catch((error: FastifyError) => {
    reply.send(error);
  });
  })
.catch((error) => {
  reply.send(error);
});
}

export {
  listAll,
  bulkUpload,
  addSubCategory,
  listSubCategory,
  updateSubCategory,
  detailSubCategory,
  deleteSubCategory
};
