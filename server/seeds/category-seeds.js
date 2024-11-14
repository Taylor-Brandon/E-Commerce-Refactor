const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Skirts',
  },
  {
    category_name: 'Coats',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
  {
    category_name: 'Sets',
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;