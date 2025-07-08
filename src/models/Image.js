const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  Image_Url: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Image', imageSchema);
  