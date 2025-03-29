const mongoose = require('mongoose');

const sortSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ThuTuSapXep: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Sort = mongoose.model('Sort', sortSchema);
module.exports = Sort;