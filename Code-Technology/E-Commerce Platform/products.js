const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Search & filter
router.get('/', async (req, res) => {
  const {search, category} = req.query;
  let query = {};
  if (search) query.name = {$regex: search, $options: 'i'};
  if (category) query.category = category;
  const products = await Product.find(query);
  res.json(products);
});

// Admin - CRUD
router.post('/', authenticateJWT, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;
