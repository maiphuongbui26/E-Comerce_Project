const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenLoaiSanPham: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const ProductType = mongoose.model('ProductType', productTypeSchema);
module.exports = ProductType;