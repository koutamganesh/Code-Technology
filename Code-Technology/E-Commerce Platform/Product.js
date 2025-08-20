const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  quantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);
