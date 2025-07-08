const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagePlantSchema = new Schema({
  Plant_Id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  Image_Id: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
  Image_Order: { type: Number },
});

module.exports = mongoose.model('ImagePlant', imagePlantSchema);
