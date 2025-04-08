const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  // Login
  login: async (req, res) => {
    try {
      const { ThuDienTu, MatKhau } = req.body;
      const user = await User.findOne({ ThuDienTu });
      
      if (!user) {
        return res.status(401).json({ message: 'Email không tồn tại' });
      }

      const isValidPassword = await bcrypt.compare(MatKhau, user.MatKhau);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
      }

      const token = jwt.sign(
        { id: user.id, VaiTro: user.VaiTro },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user: { ...user._doc, MatKhau: undefined } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create/Register user
  create: async (req, res) => {
    try {
      const { MatKhau, ...userData } = req.body;
      const hashedPassword = await bcrypt.hash(MatKhau, 10);
      
      const user = new User({
        ...userData,
        MatKhau: hashedPassword
      });

      await user.save();
      res.status(201).json({ message: 'Tạo tài khoản thành công', user: { ...user._doc, MatKhau: undefined } });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all users with pagination and filters
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search, TrangThai } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { HoVaTen: new RegExp(search, 'i') },
          { ThuDienTu: new RegExp(search, 'i') },
          { SoDienThoai: new RegExp(search, 'i') }
        ];
      }

      if (TrangThai) {
        query.TrangThai = TrangThai;
      }

      const users = await User.find(query)
        .select('-MatKhau')
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await User.countDocuments(query);

      res.json({
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user by ID
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-MatKhau');
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update user
  update: async (req, res) => {
    try {
      const { MatKhau, ...updateData } = req.body;
      
      if (MatKhau) {
        updateData.MatKhau = await bcrypt.hash(MatKhau, 10);
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      ).select('-MatKhau');

      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete user
  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;