const Warehouse = require('../models/warehouse.model');
const Product = require('../models/product.model');
const generateWarehouseId = require('../utils/generateId');

const warehouseController = {
  // Import stock
  importStock: async (req, res) => {
    try {
      const { SanPham, SoLuong, NgayNhapKho } = req.body;
      const product = await Product.findOne({ idSanPham: SanPham });
      
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // Kiểm tra xem đã có phiếu nhập kho cho sản phẩm này chưa
      const existingWarehouse = await Warehouse.findOne({
        'SanPham.idSanPham': SanPham,
        NgayNhapKho: { $exists: true },
        NgayXuatKho: { $exists: false }
      });

      if (existingWarehouse) {
        // Nếu đã có, tăng số lượng trong kho hiện tại
        existingWarehouse.SoLuong += SoLuong;
        await existingWarehouse.save();
        
        res.status(201).json({ 
          message: 'Nhập kho thành công', 
          warehouse: existingWarehouse,
          product: {
            idSanPham: product.idSanPham,
            TenSanPham: product.TenSanPham,
            SoLuong: product.SoLuong
          }
        });
      } else {
        // Nếu chưa có, tạo phiếu nhập kho mới
        const warehouse = new Warehouse({
          id: generateWarehouseId('WH'),
          SanPham: product.toObject(),
          NgayNhapKho: NgayNhapKho || new Date(),
          SoLuong
        });

        await warehouse.save();
        
        res.status(201).json({ 
          message: 'Tạo phiếu nhập kho mới thành công', 
          warehouse,
          product: {
            idSanPham: product.idSanPham,
            TenSanPham: product.TenSanPham,
            SoLuong: product.SoLuong
          }
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Export stock
  exportStock: async (req, res) => {
    try {
      const { SanPham, SoLuong, NgayXuatKho, HanBanLoHang } = req.body;

      // Tìm sản phẩm
      const product = await Product.findOne({ idSanPham: SanPham });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // Tìm phiếu nhập kho có số lượng còn đủ
      const warehouseStock = await Warehouse.findOne({
        'SanPham.idSanPham': SanPham,
        NgayNhapKho: { $exists: true },
        NgayXuatKho: { $exists: false },
        SoLuong: { $gte: SoLuong }
      });

      if (!warehouseStock) {
        return res.status(400).json({ message: 'Số lượng trong kho không đủ để xuất' });
      }

      // Tạo phiếu xuất kho
      const warehouse = new Warehouse({
        id: generateWarehouseId('WH'),
        SanPham: product.toObject(),
        NgayXuatKho: NgayXuatKho || new Date(),
        SoLuong: -SoLuong,  // Số âm để đánh dấu xuất kho
        HanBanLoHang
      });

      // Giảm số lượng trong kho
      warehouseStock.SoLuong -= SoLuong;
      await warehouseStock.save();

      // Tăng số lượng sản phẩm (bao gồm cả hàng tồn kho nếu có)
      const tonKhoSoLuong = product.TonKho?.SoLuong || 0;
      product.SoLuong = (product.SoLuong || 0) + SoLuong + tonKhoSoLuong;
      
      // Reset TonKho về 0 sau khi đã cộng vào SoLuong
      if (product.TonKho) {
        product.TonKho.SoLuong = 0;
      }
      
      await product.save();
      await warehouse.save();

      res.status(201).json({ 
        message: 'Xuất kho thành công', 
        warehouse,
        product: {
          idSanPham: product.idSanPham,
          TenSanPham: product.TenSanPham,
          SoLuong: product.SoLuong,
          TonKho: product.TonKho
        },
        warehouseStock: {
          id: warehouseStock.id,
          SoLuongConLai: warehouseStock.SoLuong
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all warehouse entries
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        const products = await Product.find({ 
          TenSanPham: new RegExp(search, 'i') 
        });
        const productIds = products.map(p => p._id);
        query.SanPham = { $in: productIds };
      }

      const warehouses = await Warehouse.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Warehouse.countDocuments(query);

      res.json({
        warehouses,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get warehouse entry by ID
  getById: async (req, res) => {
    try {
      const warehouse = await Warehouse.findOne({ id: req.params.id })
        .populate('SanPham', ['idSanPham', 'TenSanPham', 'SoLuong']);

      if (!warehouse) {
        return res.status(404).json({ message: 'Không tìm thấy phiếu kho' });
      }

      res.json(warehouse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update warehouse entry
  update: async (req, res) => {
    try {
      const warehouse = await Warehouse.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      ).populate('SanPham', ['idSanPham', 'TenSanPham', 'SoLuong']);

      if (!warehouse) {
        return res.status(404).json({ message: 'Không tìm thấy phiếu kho' });
      }

      res.json({ 
        message: 'Cập nhật phiếu kho thành công', 
        warehouse 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete warehouse entry
  delete: async (req, res) => {
    try {
      const warehouse = await Warehouse.findOneAndDelete({ id: req.params.id });
      
      if (!warehouse) {
        return res.status(404).json({ message: 'Không tìm thấy phiếu kho' });
      }

      // If it's an import record, decrease the product quantity
      if (!warehouse.NgayXuatKho) {
        const product = await Product.findOne({ idSanPham: warehouse.SanPham });
        if (product) {
          product.SoLuong -= warehouse.SoLuong;
          await product.save();
        }
      }

      res.json({ 
        message: 'Xóa phiếu kho thành công',
        id: warehouse.id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create import receipt
  createImportReceipt: async (req, res) => {
    try {
      const { productId, quantity, importDate, expiryDate, note } = req.body;

      // Change this line to use idSanPham instead of _id
      const product = await Product.findOne({ idSanPham: productId });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // In createImportReceipt function
      const warehouse = new Warehouse({
        id: generateWarehouseId('WH'),
        SanPham: product.toObject(), // Store full product object
        NgayNhapKho: importDate || new Date(),
        HanBanLoHang: expiryDate,
        SoLuong: quantity,
        GhiChu: note
      });

      // Update product quantity
      product.SoLuong = (product.SoLuong || 0) + quantity;
      await product.save();
      await warehouse.save();

      res.status(201).json({
        message: 'Tạo phiếu nhập kho thành công',
        warehouse: await warehouse.populate('SanPham', ['idSanPham', 'TenSanPham', 'SoLuong'])
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = warehouseController;