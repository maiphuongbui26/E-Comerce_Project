const ProductCategory = require('../models/productCategory.model');
const generatePCId = require('../utils/generateId');

const productCategoryController = {
  // Create new category
  create: async (req, res) => {
    try {
      const categoryData = req.body;
      const category = new ProductCategory({
        idDanhMuc: generatePCId('DM'),
        ...categoryData
      });

      await category.save();
      res.status(201).json({ 
        message: 'Tạo danh mục thành công', 
        category 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all categories with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { TenDanhMuc: new RegExp(search, 'i') },
          { MoTa: new RegExp(search, 'i') }
        ];
      }

      const categories = await ProductCategory.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await ProductCategory.countDocuments(query);

      res.json({
        categories,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get category by ID
  getById: async (req, res) => {
    try {
      const category = await ProductCategory.findOne({ idDanhMuc: req.params.id });
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update category
  update: async (req, res) => {
    try {
      const category = await ProductCategory.findOneAndUpdate(
        { idDanhMuc: req.params.id },
        req.body,
        { new: true }
      );

      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }

      res.json({ 
        message: 'Cập nhật danh mục thành công', 
        category 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete category
  delete: async (req, res) => {
    try {
      const category = await ProductCategory.findOneAndDelete({ idDanhMuc: req.params.id });
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }
      res.json({ message: 'Xóa danh mục thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productCategoryController;