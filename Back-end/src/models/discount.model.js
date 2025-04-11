const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenChuongTrinh: {
    type: String,
    required: true,
    trim: true
  },
  NgayBatDau: {
    type: Date,
    required: true
  },
  NgayKetThuc: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Discount', discountSchema);