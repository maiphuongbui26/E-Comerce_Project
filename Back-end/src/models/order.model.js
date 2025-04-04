const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  idDonHang: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  NguoiDung: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  DanhSachSanPham: [{
    SanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    TenSanPham: {
      type: String,
      required: true
    },
    GiaSanPham: {
      type: Number,
      required: true
    },
    SoLuong: {
      type: Number,
      required: true,
      min: 1
    },
    MauSac: {
      type: String
    },
    KichThuoc: {
      type: String
    }
  }],
  MaGiamGia: {
    type: String,
    trim: true
  },
  PhiShip: {
    type: Number,
    default: 0
  },
  TongTien: {
    type: Number,
    required: true
  },
  NgayDatHang: {
    type: Date,
    default: Date.now
  },
  DiaChiGiaoHang: {
    type: String,
    required: true
  },
  PhuongThucThanhToan: {
    type: String,
    enum: ['cash', 'credit_card', 'bank_transfer', 'e_wallet'],
    required: true
  },
  TrangThaiDonHang: {
    type: String,
    enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
    default: 'pending'
  },
  GhiChu: {
    type: String,
    trim: true
  },
  NgayCapNhat: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
orderSchema.index({ idDonHang: 1 });
orderSchema.index({ NguoiDung: 1 });
orderSchema.index({ NgayDatHang: -1 });
orderSchema.index({ TrangThaiDonHang: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;