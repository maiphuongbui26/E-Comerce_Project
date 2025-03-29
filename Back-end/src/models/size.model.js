const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenKichThuoc: {
    type: String,
    required: true,
    trim: true
  },
  MoTa: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Size = mongoose.model('Size', sizeSchema);
module.exports = Size;