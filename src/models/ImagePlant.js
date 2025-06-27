const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagePlantSchema = new Schema({
    plant: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
    order: { type: Number },
  });
  
  module.exports = mongoose.model('ImagePlant', imagePlantSchema);
  