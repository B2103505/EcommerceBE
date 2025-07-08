const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
  Order_Status_Name: { type: String, required: true },
});

module.exports = mongoose.model('OrderStatus', orderStatusSchema);
