const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
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

const Price = mongoose.model('Price', priceSchema);
module.exports = Price;