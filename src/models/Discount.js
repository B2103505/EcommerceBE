const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  Discount_Value: { type: Number, required: true },
  Discount_Start_Date: { type: Date },
  Discount_End_Date: { type: Date },
});

module.exports = mongoose.model('Discount', discountSchema);
