const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    value: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
  });
  
  module.exports = mongoose.model('Discount', discountSchema);
  