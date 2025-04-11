const Product = require('../models/product.model');
const generateProductId = require('../utils/generateId');

const productController = {
  // Create new product
  create: async (req, res) => {
    try {
      const productData = req.body;
      const product = new Product({
        idSanPham: generateProductId('SP'),
        ...productData
      });

      await product.save();
      res.status(201).json({ 
        message: 'Tạo sản phẩm thành công', 
        product 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all products with advanced filtering, pagination and search
  getAll: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search,
        category,
        productType,
        minPrice,
        maxPrice,
        status,
        sortBy = 'createdAt',
        order = 'desc'
      } = req.query;

      const query = {};

      // Search in multiple fields
      if (search) {
        query.$or = [
          { TenSanPham: new RegExp(search, 'i') },
          { MoTa: new RegExp(search, 'i') },
          { MauSac: new RegExp(search, 'i') }
        ];
      }

      // Category filter
      if (category) {
        query['DanhMuc.idDanhMuc'] = category;
      }

      // Product type filter
      if (productType) {
        query['LoaiSanPham.id'] = productType;
      }

      // Price range filter
      if (minPrice || maxPrice) {
        query.GiaSanPham = {};
        if (minPrice) query.GiaSanPham.$gte = Number(minPrice);
        if (maxPrice) query.GiaSanPham.$lte = Number(maxPrice);
      }

      // Status filter
      if (status) {
        query.TrangThai = status;
      }

      // Sorting
      const sortOptions = {};
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;

      const products = await Product.find(query)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Product.countDocuments(query);

      res.json({
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        total
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get product by ID
  getById: async (req, res) => {
    try {
      const product = await Product.findOne({ idSanPham: req.params.id });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update product
  update: async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { idSanPham: req.params.id },
        req.body,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      res.json({ 
        message: 'Cập nhật sản phẩm thành công', 
        product 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete product
  delete: async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({ idSanPham: req.params.id });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update product stock
  updateStock: async (req, res) => {
    try {
      const { SoLuong } = req.body;
      const product = await Product.findOne({ idSanPham: req.params.id });

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      product.SoLuong = SoLuong;
      product.TrangThai = SoLuong > 0 ? 'available' : 'outOfStock';
      
      await product.save();
      res.json({ 
        message: 'Cập nhật số lượng thành công', 
        product 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Toggle favorite status
  toggleFavorite: async (req, res) => {
    try {
      const product = await Product.findOne({ idSanPham: req.params.id });
      
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      product.YeuThich = !product.YeuThich;
      await product.save();

      res.json({ 
        message: `Đã ${product.YeuThich ? 'thêm vào' : 'xóa khỏi'} danh sách yêu thích`, 
        product 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = productController;