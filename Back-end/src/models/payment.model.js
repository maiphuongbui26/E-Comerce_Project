const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  idThanhToan: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  DonHang: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }],
  SoTien: {
    type: Number,
    required: true
  },
  PhuongThucThanhToan: {
    type: String,
    enum: ['cash', 'credit_card', 'bank_transfer', 'e_wallet'],
    required: true
  },
  TrangThaiThanhToan: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  NgayThanhToan: {
    type: Date,
    default: null
  },
  MoTa: {
    type: String,
    trim: true
  },
  NguoiThanhToan: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
paymentSchema.index({ idThanhToan: 1 });
paymentSchema.index({ TrangThaiThanhToan: 1 });
paymentSchema.index({ NgayThanhToan: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;