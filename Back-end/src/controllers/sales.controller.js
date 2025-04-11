const Sales = require('../models/sales.model');
const generateSaleId = require('../utils/generateId');

const salesController = {
  // Create new sales
  create: async (req, res) => {
    try {
      const salesData = req.body;
      const sales = new Sales({
        id: generateSaleId('P'),
        ...salesData
      });
      await sales.save();
      res.status(201).json({ 
        message: 'Tạo mã thành công', 
        sales 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all saless with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.TenChuongTrinh = new RegExp(search, 'i');
      }

      const sales = await Sales.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Sales.countDocuments(query);

      res.json({
        sales,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get sales by ID
  getById: async (req, res) => {
    try {
      const sales = await Sales.findOne({ id: req.params.id });
      if (!sales) {
        return res.status(404).json({ message: 'Không tìm thấy đơn giá' });
      }
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update sales
  update: async (req, res) => {
    try {
      const sales = await Sales.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );

      if (!sales) {
        return res.status(404).json({ message: 'Không tìm thấy đơn giá' });
      }

      res.json({ 
        message: 'Cập nhật đơn giá thành công', 
        sales 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete sales
  delete: async (req, res) => {
    try {
      const sales = await Sales.findOneAndDelete({ id: req.params.id });
      if (!sales) {
        return res.status(404).json({ message: 'Không tìm thấy đơn giá' });
      }
      res.json({ message: 'Xóa đơn giá thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = salesController;