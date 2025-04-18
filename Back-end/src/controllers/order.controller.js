const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const generateOrderId = require('../utils/generateId');

const orderController = {
  // Create new order
  create: async (req, res) => {
    try {
       console.log(req.body)
      const order = new Order({
        idDonHang: generateOrderId('DH'),
        ...req.body
      });
      await order.save();
      res.status(201).json({
        message: 'Tạo đơn hàng thành công',
        order
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all orders with filtering and pagination
  getAll: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        status,
        startDate,
        endDate,
        sortBy = 'createdAt',
        order = 'desc'
      } = req.query;

      const query = {};

      if (status) {
        query.TrangThaiDonHang = status;
      }

      if (startDate || endDate) {
        query.NgayDatHang = {};
        if (startDate) query.NgayDatHang.$gte = new Date(startDate);
        if (endDate) query.NgayDatHang.$lte = new Date(endDate);
      }

      const sortOptions = {};
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;

      const orders = await Order.find(query)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Order.countDocuments(query);

      res.json({
        orders,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        total
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const orders = await Order.find({ 'NguoiDung.id': req.user._id })
        .sort({ createdAt: -1 });

      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get order by ID
  getById: async (req, res) => {
    try {
      const order = await Order.findOne({ idDonHang: req.params.id });
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update order status
  updateStatus: async (req, res) => {
    try {
      const { TrangThaiDonHang } = req.body;
      const order = await Order.findOne({ idDonHang: req.params.id });

      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      order.TrangThaiDonHang = TrangThaiDonHang;
      await order.save();

      res.json({
        message: 'Cập nhật trạng thái đơn hàng thành công',
        order
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Cancel order
  cancelOrder: async (req, res) => {
    try {
      const order = await Order.findOne({ idDonHang: req.params.id });

      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      if (order.TrangThaiDonHang !== 'pending') {
        return res.status(400).json({ 
          message: 'Không thể hủy đơn hàng ở trạng thái hiện tại' 
        });
      }

      order.TrangThaiDonHang = 'cancelled';
      await order.save();

      res.json({
        message: 'Hủy đơn hàng thành công',
        order
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = orderController;