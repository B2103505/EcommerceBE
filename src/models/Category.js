const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Category_Name: { type: String, required: true },
  Category_Image: { type: String },
  Category_Status: { type: String },
  }, { timestamps: true });
  
module.exports = mongoose.model('Category', CategorySchema);
  