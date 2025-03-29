const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenTinhThanh: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Province = mongoose.model('Province', provinceSchema);

module.exports = Province;