const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  IdNhaCungCap: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenNhaCungCap: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  SoDienThoai: {
    type: String,
    required: true,
    trim: true
  },
  DiaChi: {
    type: String,
    required: true,
    trim: true
  },
  MoTa: {
    type: String,
    trim: true
  },
  SanPhamCungCap: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  TrangThai: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  NgayTao: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;