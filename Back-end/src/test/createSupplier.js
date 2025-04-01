const mongoose = require('mongoose');
const Supplier = require('../models/supplier.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testSupplier = new Supplier({
        IdNhaCungCap: 'SUP00001',
        TenNhaCungCap: 'Công ty Test',
        Email: 'test@supplier.com',
        SoDienThoai: '0123456789',
        DiaChi: 'Địa chỉ test',
        MoTa: 'Nhà cung cấp test'
      });

      await testSupplier.save();
      console.log('Test supplier created successfully');
      
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));