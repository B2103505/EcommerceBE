const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    Plant_Name: { type: String, required: true },
    Plant_Scientific_Name: { type: String },
    Plant_Leaf_Shape: { type: String },
    Plant_Leaf_Color: { type: String },
    Plant_Growth_Form: { type: String },
    Plant_Size: { type: String },
    Plant_Context: { type: String },
    Plant_Light: { type: String },
    Plant_Foliage_Density: { type: String },
    Plant_Other_Name: { type: String },
    Plant_Description: { type: String },
    Plant_Quantity: { type: Number },
    Plant_Sold: { type: Number, default: 0 },
    Plant_Status: { type: String, enum: ['available', 'unavailable'] },
    Plant_Price: { type: Number, required: true },
    Category_Id: { type: Schema.Types.ObjectId, ref: 'Category', required: false, default: null },
    Plant_averageRating: { type: Number, default: 0 },
    Plant_ratingCount: { type: Number, default: 0 },

}, { timestamps: true }); 

module.exports = mongoose.model('Plant', plantSchema);
