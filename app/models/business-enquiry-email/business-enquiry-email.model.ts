import db from '../../config/database';
import { Sequelize } from 'sequelize';
import { BusinessEnquiryEmailStatic } from '../../types';
import { modelOptions, attributes } from './business-enquiry-email.model.attributes';

function BusinessEnquiryEmailModelFactory(sequelize: Sequelize): BusinessEnquiryEmailStatic {
  return sequelize.define(
    'BusinessEnquiryEmail',
    attributes,
    modelOptions
  ) as BusinessEnquiryEmailStatic;
}

const BusinessEnquiryEmail = BusinessEnquiryEmailModelFactory(db);

export default BusinessEnquiryEmail;
