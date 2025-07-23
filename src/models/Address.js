const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  Address_Type: {
    type: String,
    enum: ['HOME', 'SHIPPING'],
    default: 'SHIPPING'
  },
  Address_Province_Id: String,
  Address_Province_Name: String,
  Address_District_Id: String,
  Address_District_Name: String,
  Address_WardCode: String,
  Address_WardName: String,
  Address_Detail_Address: String,
  Address_Fullname: String,
  Address_Phone: String,
  Address_Latitude: Number,
  Address_Longitude: Number,
  User_Id: { type: Schema.Types.ObjectId, ref: 'User' },
  Order_Id: { type: Schema.Types.ObjectId, ref: 'Order' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Address', AddressSchema);

