const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  Review_Rate: { type: Number, required: true, min: 1, max: 5 },
  Review_Comment: { type: String, trim: true },
  Review_Images: [{ type: String }],

  User_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  Plant_Id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },

}, { timestamps: true });

reviewSchema.index({ User_Id: 1, Plant_Id: 1 }, { unique: true }); // mỗi user chỉ đánh giá 1 lần/plant

module.exports = mongoose.model('Review', reviewSchema);