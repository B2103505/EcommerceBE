const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  User_Email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  User_Password: { type: String, required: true },
  User_PhoneNumber: { type: String },
  User_Fullname: { type: String },
  User_Avatar: { type: String },
  Role_Id: { type: Schema.Types.ObjectId, ref: 'Role', required: false, default: null },
  access_token: { type: String, required: false },
  refresh_token: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
