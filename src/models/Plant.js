const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: { type: String, required: true },
    scientificName: { type: String },
    leafShape: { type: String },
    leafColor: { type: String },
    growthForm: { type: String },
    size: { type: String },
    context: { type: String },
    light: { type: String },
    foliageDensity: { type: String },
    otherName: { type: String },
    description: { type: String },
    quantity: { type: Number },
    sold: { type: Number, default: 0 },
    status: { type: String, enum: ['available', 'unavailable'] },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);
