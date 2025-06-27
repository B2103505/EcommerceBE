const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    provinceId: { type: String },
    provinceName: { type: String },
    districtName: { type: String },
    districtId: { type: String },
    wardCode: { type: String },
    wardName: { type: String },
    detailAddress: { type: String },
    fullName: { type: String },
    phone: { type: String },
  });
  
  module.exports = mongoose.model('Address', addressSchema);
  