  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('User', userSchema);
