// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
