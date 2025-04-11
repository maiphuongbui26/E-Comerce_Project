const Product = require('../models/product.model');
const generateProductId = require('../utils/generateId');
const fs = require('fs').promises;
const path = require('path');

const productController = {
  // Create new product
  create: async (req, res) => {
    try {
      const productData = req.body;
      
      // Handle image uploads
      if (req.files && req.files.length > 0) {
        const imageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
        productData.HinhAnh = imageUrls; // This is already an array
      }

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
      // Delete uploaded files if there's an error
      if (req.files) {
        for (const file of req.files) {
          await fs.unlink(file.path).catch(console.error);
        }
      }
      res.status(400).json({ message: error.message });
    }
  },

  // Update product
  update: async (req, res) => {
    try {
      const productData = req.body;
      const existingProduct = await Product.findOne({ idSanPham: req.params.id });

      if (!existingProduct) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // Handle image uploads
      if (req.files && req.files.length > 0) {
        const newImageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
        
        if (req.body.keepExistingImages === 'true') {
          productData.HinhAnh = [...(existingProduct.HinhAnh || []), ...newImageUrls];
        } else {
          productData.HinhAnh = newImageUrls;
        }
      }

      // Update TrangThai based on SoLuong
      if ('SoLuong' in productData) {
        productData.TrangThai = productData.SoLuong > 0 ? 'available' : 'outOfStock';
      }

      const product = await Product.findOneAndUpdate(
        { idSanPham: req.params.id },
        productData,
        { new: true }
      );

      res.json({ 
        message: 'Cập nhật sản phẩm thành công', 
        product 
      });
    } catch (error) {
      if (req.files) {
        for (const file of req.files) {
          await fs.unlink(file.path).catch(console.error);
        }
      }
      res.status(400).json({ message: error.message });
    }
  },

  // Combine and update the delete method
  delete: async (req, res) => {
    try {
      const product = await Product.findOne({ idSanPham: req.params.id });
      
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // Delete associated images
      for (const imageUrl of product.HinhAnh || []) {
        const imagePath = path.join(__dirname, '../../public', imageUrl);
        await fs.unlink(imagePath).catch(console.error);
      }

      await product.deleteOne();
      res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update getAll method to handle TrangThai
  getAll: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search,
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

      // Remove category filter since it's not in the model
      
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

  // Delete single image
  deleteImage: async (req, res) => {
    try {
      const { id, filename } = req.params;
      const product = await Product.findOne({ idSanPham: id });

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      const imageUrl = `/uploads/products/${filename}`;
      const imagePath = path.join(__dirname, '../../public', imageUrl);
      
      // Remove from database
      product.HinhAnh = product.HinhAnh.filter(url => url !== imageUrl);
      await product.save();

      // Delete file
      await fs.unlink(imagePath).catch(console.error);

      res.json({ 
        message: 'Xóa ảnh thành công', 
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
        query['DanhMuc.id'] = category;
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