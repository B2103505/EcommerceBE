const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    plant: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Schema.Types.ObjectId, ref: 'Discount' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('OrderDetail', orderDetailSchema);
  