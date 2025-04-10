const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenLoaiSanPham: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const ProductType = mongoose.model('ProductType', productTypeSchema);
module.exports = ProductType;