const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    plant: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Schema.Types.ObjectId, ref: 'Discount' },
  });
  
  module.exports = mongoose.model('CartItem', cartItemSchema);
  