const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  Review_Rate: { type: Number, min: 1, max: 5 },
  Review_Comment: { type: String },
  User_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Plant_Id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  }, { timestamps: true });
  
module.exports = mongoose.model('Review', reviewSchema);
