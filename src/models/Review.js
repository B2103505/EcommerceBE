const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rate: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plant: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Review', reviewSchema);
