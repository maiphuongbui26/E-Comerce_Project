const mongoose = require('mongoose');

const priceUnitSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenDonGia: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const PriceUnit = mongoose.model('PriceUnit', priceUnitSchema);
module.exports = PriceUnit;