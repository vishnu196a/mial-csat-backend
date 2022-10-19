import { Category, SubCategory, EmailTemplate } from '..';

function defineScopeAndAssociation() {
  EmailTemplate.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id'
  });

  EmailTemplate.belongsTo(SubCategory, {
    as: 'sub_category',
    foreignKey: 'sub_category_id'
  });
}

export default defineScopeAndAssociation;
