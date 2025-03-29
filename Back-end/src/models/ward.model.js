const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenXaPhuong: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Ward = mongoose.model('Ward', wardSchema);
module.exports = Ward;