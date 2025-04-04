const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  idSanPham: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenSanPham: {
    type: String,
    required: true,
    trim: true
  },
  GiaSanPham: {
    type: Number,
    required: true
  },
  SoLuong: {
    type: Number,
    required: true,
    default: 0
  },
  MoTa: {
    type: String,
    trim: true
  },
  MauSac: {
    type: String,
    trim: true
  },
  TrangThai: {
    type: String,
    enum: ['available', 'outOfStock', 'discontinued'],
    default: 'available'
  },
  DanhGia: {
    type: String,
    trim: true
  },
  HinhAnh: [{
    type: String,
    trim: true
  }],
  KichThuoc: {
    type: String,
    trim: true
  },
  YeuThich: {
    type: Boolean,
    default: false
  },
  NhaCungCap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ TenSanPham: 1 });
productSchema.index({ GiaSanPham: 1 });
productSchema.index({ NhaCungCap: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;