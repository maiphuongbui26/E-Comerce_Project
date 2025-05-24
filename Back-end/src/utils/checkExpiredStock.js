const Warehouse = require('../models/warehouse.model');
const Product = require('../models/product.model');

async function checkExpiredStock() {
  try {
    const expiredWarehouses = await Warehouse.aggregate([
      {
        $match: {
          NgayXuatKho: { $exists: true },
          HanBanLoHang: { $lt: new Date() },
          DaXuLyTonKho: { $ne: true } 
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$SanPham.idSanPham',
          latestWarehouse: { $first: '$$ROOT' }
        }
      }
    ]);

    for (const { latestWarehouse } of expiredWarehouses) {
      const product = await Product.findOne({ idSanPham: latestWarehouse.SanPham.idSanPham });
      // console.log('Sản phẩm:', product);
      if (product) {
        const warehouse = await Warehouse.findById(latestWarehouse._id);
        if (warehouse) {
          warehouse.DaXuLyTonKho = true; 
          await warehouse.save();
        }
        await product.chuyenSangTonKho(product.SoLuong, latestWarehouse.HanBanLoHang);
      }
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra hàng tồn kho:', error);
  }
}

module.exports = checkExpiredStock;