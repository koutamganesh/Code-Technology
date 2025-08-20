const express = require('express');
const Product = require('../models/Product');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

// Inventory stats
router.get('/inventory', authenticateJWT, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  const summary = await Product.aggregate([
    { $group: { _id: "$category", total: { $sum: "$quantity" } } }
  ]);
  res.json(summary);
});

module.exports = router;
