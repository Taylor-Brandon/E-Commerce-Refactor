const { Product } = require('../models');


const productData = [
  {
    product_name: 'Blue Jacket',
    price: 193.99,
    stock: 14,
    productImage: '/images/blue.jpg',
    category_id: 3,
    description: '69% Cotton, 31% nylon; lining 78% polyester.'
  },
  {
    product_name: 'Denim Jacket',
    price: 240.75,
    stock: 25,
    productImage: '/images/denim.jpg',
    category_id: 3,
    description: '52% Polyester, 5% cotton, 3% viscose; 50% Cotton',
  },
  {
    product_name: 'Green Jacket',
    price: 320.99,
    stock: 12,
    productImage: '/images/green.jpg',
    category_id: 3,
    description: '100% Nylon',
  },
  {
    product_name: 'Pattern Set',
    price: 272.99,
    stock: 50,
    productImage: '/images/pattern.jpg',
    category_id: 6,
    description: '80% Cotton; 20% Recycled Cotton',
  },
  {
    product_name: 'Black Skirt',
    price: 290.99,
    stock: 22,
    productImage: '/images/skirt.jpg',
    category_id: 2,
    description: '61% Polyester, 34% nylon; 5% Spandex',
  },
  {
    product_name: 'White Blouse',
    price: 390.99,
    stock: 22,
    productImage: '/images/whiteShirt.jpg',
    category_id: 1,
    description: '100% Cotton',
  },
  {
    product_name: 'Green Vest',
    price: 150.99,
    stock: 25,
    productImage: '/images/vest.jpg',
    category_id: 2,
    description: '85% Wool; 15% Satin'
  },
  {
    product_name: 'Grey Jacket',
    price: 250.99,
    stock: 30,
    productImage: '/images/grey.jpg',
    category_id: 6,
    description: '100% Wool'
  },
  {
    product_name: 'White Blazer',
    price: 75.00,
    stock: 10,
    productImage: '/images/flower.jpg',
    category_id: 1,
    description: '55% Polyester, 38% wool, 5% acrylic'
  },
  {
    product_name: 'Blue Blazer',
    price: 160.00,
    stock: 30,
    productImage: '/images/blazer.jpg',
    category_id: 1,
    description: '55% Polyester, 38% wool, 5% acrylic'
  },
  {
    product_name: 'Blue Suit',
    price: 500.00,
    stock: 5,
    productImage: '/images/suit.jpg',
    category_id: 6,
    description: '55% Polyester, 38% wool, 5% acrylic, 2% nylon'
  },
  {
    product_name: 'Plaid Blazer',
    price: 200.99,
    stock: 17,
    productImage: '/images/plaid.jpg',
    category_id: 1,
    description: '100% Wool'
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;