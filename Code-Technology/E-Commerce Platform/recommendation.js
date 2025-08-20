const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

// Basic collaborative filtering placeholder
router.get('/', authenticateJWT, async (req, res) => {
  // Recommend most frequently bought products by all users
  const orders = await Order.find().populate('products.product');
  const productCount = {};
  orders.forEach(order => {
    order.products.forEach(({product}) => {
      productCount[product._id] = (productCount[product._id] || 0) + 1;
    });
  });
  // Top 5 products
  const topProducts = Object.entries(productCount)
    .sort((a, b) => b[1] - a)
    .slice(0, 5)
    .map(([prodId]) => prodId);

  const products = await Product.find({_id: {$in: topProducts}});
  res.json(products);
});

module.exports = router;
