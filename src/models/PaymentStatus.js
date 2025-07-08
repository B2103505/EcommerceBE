const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentStatusSchema = new Schema({
  Payment_Status_Name: { type: String, required: true },
});

module.exports = mongoose.model('PaymentStatus', paymentStatusSchema);
