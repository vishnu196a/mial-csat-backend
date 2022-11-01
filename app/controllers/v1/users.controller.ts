import activityLogger from '../../config/activity-logger';
import { ValidationError } from 'sequelize';

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import {
  AddUserParams,
  UserUpdateParams,
} from '../../types';

import {
  add,
  update,
  userDelete,
  getUserById,
} from '../../services/user.service';

function addUser(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddUserParams;
  const currentUser = req.currentUser;
  add(params).then((user) => {
    activityLogger.log(currentUser, user, 'user', 'created');
    reply.code(201).send({ message: 'User add synced Successfully' });
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
          reply.code(200).send({ message: 'User update synced Successfully' });
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
      reply.send({ message: 'User delete synced Successfully' });
    })
    .catch((error) => {
      reply.send(error);
    });
}

export {
  addUser,
  updateUser,
  deleteUser,
};
