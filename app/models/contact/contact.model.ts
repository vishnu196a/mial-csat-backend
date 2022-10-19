import db from '../../config/database';

import { Sequelize } from 'sequelize';
import { ContactStatic } from '../../types';

import { modelOptions, attributes } from './contact.model.attributes';

function ContactModelFactory(sequelize: Sequelize): ContactStatic {
  return sequelize.define('Contact', attributes, modelOptions) as ContactStatic;
}

const Contact = ContactModelFactory(db);

export default Contact;
