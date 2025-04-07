const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testUser = new User({
        id: 'USER001',
        HoVaTen: 'Nguyễn Văn Test',
        NgaySinh: new Date('1990-01-01'),
        DiaChi: {
          TinhThanh: 'Hồ Chí Minh',
          HuyenQuan: 'Quận 1',
          XaPhuong: 'Phường Bến Nghé'
        },
        DanhBaLienLac: '0987654321',
        ThuDienTu: 'test.user@example.com',
        SoDienThoai: '0987654321',
        TrangThai: 'active',
        MatKhau: 'password123',
        VaiTro: 'user'
      });

      await testUser.save();
      console.log('Test user created successfully');
      
    } catch (error) {
      console.error('Error creating user:', error);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));