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
  LoaiSanPham: {
    id: String,
    TenLoaiSanPham: String
  },
  DonGia: {
    id: String,
    TenDonGia: String
  },
  SoLuong: {
    type: Number,
    required: true,
    default: 0
  },
  Style: {
    id: String,
    TenStyle: String,
    HinhAnh: String
  },
  NhaCungCap: {
    idNhaCungCap: String,
    TenNhaCungCap: String,
    Email: String,
    SoDienThoai: String,
    DiaChi: String,
    MoTa: String,
  },
  GiaSanPham: {
    type: Number,
    required: true
  },
  MoTa: String,
  MauSac: String,
  DanhGia: String,
  HinhAnh: [String],
  YeuThich: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

productSchema.index({ TenSanPham: 1 });
productSchema.index({ GiaSanPham: 1 });
productSchema.index({ 'LoaiSanPham.id': 1 });
productSchema.index({ 'DanhMuc.id': 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;