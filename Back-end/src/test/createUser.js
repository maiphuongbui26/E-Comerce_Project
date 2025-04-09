const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const password = 'admin@123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    try {
      const testUser = new User({
        id: 'USER001',
        HoVaTen: 'Admin',
        NgaySinh: new Date('1990-01-01'),
        DiaChi: {
          TinhThanh: 'Hà Nội',
          HuyenQuan: 'Bắc Từ Liêm',
          XaPhuong: 'Cầu Diễn'
        },
        DanhBaLienLac: '0978853470',
        ThuDienTu: 'adminHN1234@gmail.com',
        SoDienThoai: '0978853470',
        TrangThai: 'active',
        MatKhau: hashedPassword,
        VaiTro: 'admin'
      });

      await testUser.save();
      console.log('Test user created successfully');
      
    } catch (error) {
      console.error('Error creating user:', error);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));