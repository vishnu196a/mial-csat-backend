import activityLogger from '../../config/activity-logger';

import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

import {
  add,
  detail,
  update,
  contactDelete,
  getContactById,
  filterAndPaginate,
} from '../../services/contact.service';
import {
  AddContactParams,
  ContactUpdateParams,
  ContactListQueryParams,
} from '../../types';

function addContact(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as AddContactParams;
  const currentUser = req.currentUser;
  add(params, currentUser)
    .then((contact) => {
      activityLogger.log(currentUser, contact, 'contact', 'created');
      reply.code(201).send(contact);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function detailContact(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  detail(id)
    .then((contact) => {
      reply.code(200).send(contact);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function updateContact(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const attrs = req.body as ContactUpdateParams;
  const currentUser = req.currentUser;
  getContactById(id)
    .then(() => {
      update(id, attrs)
        .then((updatedContact) => {
          activityLogger.log(currentUser, updatedContact, 'contact', 'updated');
          reply.code(200).send(updatedContact);
        })
        .catch((error) => {
          reply.send(error);
        });
    })
    .catch((error) => {
      reply.send(error);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as ContactListQueryParams;
  filterAndPaginate(query)
    .then((contacts) => {
      reply.code(200).send(contacts);
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

function deleteContact(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const currentUser = req.currentUser;
  getContactById(id)
    .then(async (contact) => {
      await contactDelete(id);
      activityLogger.log(currentUser, { id }, 'contact', 'deleted');
      reply.code(200).send({ message: 'Contact deleted successfully' });
    })
    .catch((error: FastifyError) => {
      reply.send(error);
    });
}

export {
  list,
  addContact,
  detailContact,
  updateContact,
  deleteContact
};
