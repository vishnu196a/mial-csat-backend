import { Q_MINIMUM_SIZE } from '../config/constants';
import { getCategoryById } from './category.service';
import { EmptyResultError } from 'sequelize';
import { getSubCategoryById } from './sub-category.service';

import { map, size } from 'lodash';
import { paginate, paginatorResult } from '../lib/paginator-result';
import { getById as getTerminalById } from './terminal.service';
import { ContactInstance, UserInstance } from '../types';
import { columnSearchQuery, globalSearchQuery } from '../queries/contact';

import {
  User,
  Contact,
  Category,
  Terminal,
  SubCategory
} from '../models';
import {
  AddContactParams,
  ContactRowsAndCount,
  ContactUpdateParams,
  ContactListQueryParams,
} from '../types/contacts.controller';

async function getContactById(id: number): Promise<ContactInstance> {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    throw new EmptyResultError('Contact not found');
  }
  return contact;
}

async function add(attrs: AddContactParams, user: UserInstance): Promise<ContactInstance> {
  const { category_id: categoryId, sub_category_id: subCategoryId } = attrs;
  const category = await getCategoryById(categoryId);
  const subCategory = await getSubCategoryById(subCategoryId, categoryId);
  const terminal = await getTerminalById(attrs.terminal_id);

  return Contact.create({
    ...attrs,
    created_by: user.id,
    terminal_id: terminal.id,
    category_id: category.id,
    sub_category_id: subCategory.id,
  });
}

async function detail(id: number) {
  try {
    const contact = await Contact.findOne({
      where: { id },
      include: [
        {
          as: 'user',
          model: User,
          attributes: ['id', 'name'],
          paranoid: false
        },
        {
          as: 'category',
          model: Category,
          attributes: ['id', 'name'],
          paranoid: false
        },
        {
          as: 'sub_category',
          model: SubCategory,
          attributes: ['id', 'name'],
          paranoid: false
        },
        {
          as: 'terminal',
          model: Terminal,
          attributes: ['id', 'name'],
          paranoid: false
        }
      ],
    });
    if (!contact) {
      throw new EmptyResultError('Contact not found');
    }
    const contactData = {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      category_id: contact.category_id,
      terminal_id: contact.terminal.id,
      created_by_id: contact.created_by,
      terminal_name: contact.terminal.name,
      category_name: contact.category.name,
      landline_number: contact.landline_number,
      created_by_name: contact.user.name,
      sub_category_id: contact.sub_category_id,
      sub_category_name: contact.sub_category.name,
    };
    return contactData;
  } catch (error) {
    throw error;
  }
}

async function update(id: number, attrs: ContactUpdateParams) {
  const contact = await getContactById(id);
  const category = await getCategoryById(attrs.category_id);
  const terminal = await getTerminalById(attrs.terminal_id);
  const subCategory = await getSubCategoryById(
    attrs.sub_category_id,
    attrs.category_id
  );
  await contact.update({
    name: attrs.name,
    phone: attrs.phone,
    email: attrs.email,
    terminal_id: terminal.id,
    category_id: category.id,
    sub_category_id: subCategory.id,
    landline_number: attrs.landline_number,
  });
  return getContactById(id);
}

function filterAndPaginate(query: ContactListQueryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries = size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);

  return Contact.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery },
    order: [['name', 'ASC']],
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'category',
        model: Category,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'sub_category',
        model: SubCategory,
        attributes: ['id', 'name'],
        paranoid: false
      },
      {
        as: 'terminal',
        model: Terminal,
        attributes: ['id', 'name'],
        paranoid: false
      }
    ],
  })
    .then((contacts: ContactRowsAndCount) => {
      const contactList = map(contacts.rows, (row: ContactInstance) => {
        const data = {
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          terminal_id: row.terminal.id,
          category_id: row.category.id,
          created_by_id: row.user.id,
          created_by_name: row.user.name,
          terminal_name: row.terminal.name,
          category_name: row.category.name,
          landline_number: row.landline_number,
          sub_category_id: row.sub_category.id,
          sub_category_name: row.sub_category.name,
        };
        return data;
      });
      const rowsAndcounts = { count: contacts.count, rows: contactList };
      const result = paginate(rowsAndcounts, perPage, page);
      return paginatorResult(result, 'contacts');
    })
    .catch((error) => {
      throw error;
    });
}

async function contactDelete(id: number) {
  try {
    const contact = await getContactById(id);
    return contact.destroy();
  } catch (error) {
    throw error;
  }
}

export {
  add,
  detail,
  update,
  contactDelete,
  getContactById,
  filterAndPaginate
};
