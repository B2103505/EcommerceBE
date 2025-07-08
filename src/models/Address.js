const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const AddressSchema = new Schema({
    Address_Province_Id: String,
    Address_Province_Name: String,
    Address_District_Id: String,
    Address_District_Name: String,
    Address_WardCode: String,
    Address_WardName: String,
    Address_Detail_Address: String,
    Address_Fullname: String,
    Address_Phone: String,
    User_Id: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  
  
  module.exports = mongoose.model('Address', AddressSchema);
  