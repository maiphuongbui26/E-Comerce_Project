const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  MaGiamGia: {
    type: String,
    required: true
  },
  TenChuongTrinh: {
    type: String
  }
}, {
  timestamps: true
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;