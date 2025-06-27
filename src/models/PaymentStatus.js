const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentStatusSchema = new Schema({
    name: { type: String, required: true },
  });
  
  module.exports = mongoose.model('PaymentStatus', paymentStatusSchema);
  