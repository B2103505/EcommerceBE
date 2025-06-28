const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  fullName: { type: String },
  avatar: { type: String },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: false, default: null },
  access_token: { type: String, required: false },
  refresh_token: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
