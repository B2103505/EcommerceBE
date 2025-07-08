const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
  Payment_Method_Name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
