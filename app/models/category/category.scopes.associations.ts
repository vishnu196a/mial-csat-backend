import {
  User,
  CallTag,
  Category,
  SubCategory,
  EmailTemplate
} from '../../models';

function defineScopeAndAssociation() {
  Category.belongsTo(User, {
    as: 'user',
    foreignKey: 'id'
  });

  Category.hasMany(SubCategory, {
    foreignKey: 'category_id',
    as: 'sub_categories'
  });

  Category.hasMany(CallTag, {
    as: 'call_tags',
    foreignKey: 'category_id'
  });

  Category.hasMany(EmailTemplate, {
    as: 'email_templates',
    foreignKey: 'category_id'
  });
}

export default defineScopeAndAssociation;
