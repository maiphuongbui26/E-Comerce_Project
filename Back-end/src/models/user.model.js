const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  HoVaTen: {
    type: String,
    required: true,
    trim: true
  },
  NgaySinh: {
    type: Date,
    required: true
  },
  DiaChi: {
    TinhThanh: {
      type: String,
      required: true,
      trim: true
    },
    HuyenQuan: {
      type: String,
      required: true,
      trim: true
    },
    XaPhuong: {
      type: String,
      required: true,
      trim: true
    }
  },
  DanhBaLienLac: {
    type: String,
    required: true,
    trim: true
  },
  ThuDienTu: {
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
  TrangThai: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  MatKhau: {
    type: String,
    required: true
  },
  VaiTro: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Add index for better query performance
userSchema.index({ ThuDienTu: 1 });
userSchema.index({ SoDienThoai: 1 });

// Add pre-save middleware to handle password hashing if needed
userSchema.pre('save', async function(next) {
  // Add password hashing logic here if required
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;