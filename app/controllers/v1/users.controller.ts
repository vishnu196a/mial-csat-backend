import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddUserParams,
  UserUpdateParams,
  UserListQueryParams
} from '../../types/users.controller';

import {
  add,
  detail,
  update,
  userDelete,
  getUserById,
  listAllUsers,
  filterAndPaginate
} from '../../services/user.service';

function addUser(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddUserParams;
  const currentUser = req.currentUser;
  add(params).then((user) => {
    activityLogger.log(currentUser, user, 'user', 'created');
    reply.code(201).send(user);
  })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as UserListQueryParams;
  filterAndPaginate(query)
    .then((users) => {
      reply.code(200).send(users);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((user) => {
      reply.code(200).send(user);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const attrs = req.body as UserUpdateParams;
  const { currentUser } = req;
  getUserById(id)
    .then(() => {
      update(id, attrs)
        .then((updatedUser) => {
          activityLogger.log(currentUser, updatedUser, 'user', 'updated');
          reply.code(200).send(updatedUser);
        })
        .catch((error: FastifyError) => {
          if (error instanceof ValidationError) {
            reply.send(error);
          } else {
            reply.code(422).send({ errors: [error.message] });
          }
        });
    }).catch((error: FastifyError) => {
      reply.send(error);
    });
}

function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const currentUser = req.currentUser;
  getUserById(id)
    .then(async (user) => {
      await userDelete(id);
      activityLogger.log(currentUser, user, 'user', 'deleted');
      reply.send({ message: 'User deleted successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

function listAll(req: FastifyRequest, reply: FastifyReply) {
  listAllUsers()
    .then((users) => {
      reply.code(200).send(users);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export {
  list,
  listAll,
  addUser,
  updateUser,
  deleteUser,
  detailUser
};
