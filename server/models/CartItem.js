const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number
});

module.exports = mongoose.model('CartItem', cartItemSchema);
