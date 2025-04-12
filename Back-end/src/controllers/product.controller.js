const Product = require('../models/product.model');
const generateProductId = require('../utils/generateId');
const fs = require('fs').promises;
const path = require('path');

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find()
        .populate('LoaiSanPham', 'TenLoaiSanPham')
        .populate('DonGia', 'TenDonGia')
        .populate('Style', ['TenStyle', 'HinhAnh'])
        .populate('NhaCungCap', ['TenNhaCungCap', 'Email', 'SoDienThoai'])
        .sort({ createdAt: -1 });

      // Xử lý URL ảnh cho từng sản phẩm
      const productsWithFullImageUrls = products.map(product => {
        const productObj = product.toObject();
        if (productObj.HinhAnh && productObj.HinhAnh.length > 0) {
          productObj.HinhAnh = productObj.HinhAnh.map(imageUrl => 
            `http://localhost:8080${imageUrl}`
          );
        }
        return productObj;
      });

      res.json({
        success: true,
        products: productsWithFullImageUrls,
        total: products.length
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  },

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

  create: async (req, res) => {
    try {
      const productData = req.body;
      
      // Handle base64 images
      if (productData.HinhAnh && productData.HinhAnh.length > 0) {
        const imageUrls = await Promise.all(productData.HinhAnh.map(async base64String => {
          // Extract the base64 data
          const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
      
          // Create directory if it doesn't exist
          const uploadDir = path.join(__dirname, '../../public/uploads/products');
          await fs.mkdir(uploadDir, { recursive: true });
      
          // Generate unique filename
          const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
          const filePath = path.join(uploadDir, uniqueFilename);
      
          // Save file
          await fs.writeFile(filePath, buffer);
          return `/uploads/products/${uniqueFilename}`;
        }));
      
        productData.HinhAnh = imageUrls;
      }
      console.log(productData);
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

  update: async (req, res) => {
    try {
      let productData = req.body 
      console.log("productDataUpdate",productData);
      const existingProduct = await Product.findOne({ idSanPham: req.params.id });

      if (!existingProduct) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // Handle image uploads
      if (req.files && req.files.length > 0) {
        const newImageUrls = await Promise.all(req.files.map(async file => {
          const uploadDir = path.join(__dirname, '../../public/uploads/products');
          await fs.mkdir(uploadDir, { recursive: true });

          const uniqueFilename = `${Date.now()}-${file.originalname}`;
          const filePath = path.join(uploadDir, uniqueFilename);

          await fs.writeFile(filePath, file.buffer);
          return `/uploads/products/${uniqueFilename}`;
        }));

        // Keep existing images if specified
        if (productData.keepExistingImages) {
          productData.HinhAnh = [...(existingProduct.HinhAnh || []), ...newImageUrls];
        } else {
          // Delete old images
          for (const imageUrl of existingProduct.HinhAnh || []) {
            const imagePath = path.join(__dirname, '../../public', imageUrl);
            await fs.unlink(imagePath).catch(console.error);
          }
          productData.HinhAnh = newImageUrls;
        }
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
      // Delete new uploaded files if there's an error
      if (req.files) {
        for (const file of req.files) {
          const filePath = path.join(__dirname, '../../public/uploads/products', file.filename);
          await fs.unlink(filePath).catch(console.error);
        }
      }
      res.status(400).json({ message: error.message });
    }
  },

  updateStock: async (req, res) => {
    try {
      const { quantity } = req.body;
      const product = await Product.findOne({ idSanPham: req.params.id });
      
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      product.SoLuong = quantity;
      product.TrangThai = quantity > 0 ? 'available' : 'outOfStock';
      await product.save();

      res.json({ message: 'Cập nhật số lượng thành công', product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  toggleFavorite: async (req, res) => {
    try {
      const product = await Product.findOne({ idSanPham: req.params.id });
      
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      product.YeuThich = !product.YeuThich;
      await product.save();

      res.json({ message: 'Cập nhật trạng thái yêu thích thành công', product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteImage: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({ idSanPham: req.params.id });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productController;