const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  HinhAnh: {
    type: String,
    required: true
  },
  ThongTin: {
    type: String,
    required: true
  },
  SoLuong: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  GiaTien: {
    type: Number,
    required: true,
    min: 0
  },
  DonHang: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  TongTienHang: {
    type: Number,
    default: 0
  },
  GiamGia: {
    type: Number,
    default: 0
  },
  TamTinh: {
    type: Number,
    default: 0
  },
  TongTien: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
cartSchema.index({ Id: 1 });

// Pre-save middleware to calculate totals
cartSchema.pre('save', function(next) {
  this.TongTienHang = this.SoLuong * this.GiaTien;
  this.TamTinh = this.TongTienHang - this.GiamGia;
  this.TongTien = this.TamTinh;
  next();
});

// Virtual for formatted price
cartSchema.virtual('GiaTienFormatted').get(function() {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(this.GiaTien);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;