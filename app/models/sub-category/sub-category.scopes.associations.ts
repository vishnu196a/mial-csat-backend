import { User, Category, SubCategory, EmailTemplate } from '../../models';

function defineScopeAndAssociation() {
  SubCategory.belongsTo(User, {
    as: 'user',
    foreignKey: 'id'
  });

  SubCategory.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id'
  });

  SubCategory.hasMany(EmailTemplate, {
    as: 'email_templates',
    foreignKey: 'sub_category_id'
  });
}

export default defineScopeAndAssociation;
