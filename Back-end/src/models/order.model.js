const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    idDonHang: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    NguoiDung: {
      id: String,
      HoTen: String,
      Email: String,
      SoDienThoai: String,
    },
    GioHang: {
      Id: String,
      DanhSachSanPham: [
        {
          idSanPham: String,
          TenSanPham: String,
          LoaiSanPham: {
            id: String,
            TenLoaiSanPham: String,
          },
          DanhMuc: {
            idDanhMuc: String,
            TenDanhMuc: String,
            MoTa: String,
            HinhAnh: String,
          },
          DonGia: {
            id: String,
            TenDonGia: String,
          },
          HinhAnh: String,
          SoLuong: Number,
          MauSac: String,
          KichThuoc: String,
          GiaTien: Number,
          ThanhTien: Number,
        },
      ],
      TongTienHang: Number,
      GiamGia: Number,
      TamTinh: Number,
      TongTien: Number,
    },
    MaGiamGia: {
      type: String,
      trim: true,
    },
    PhiShip: {
      type: Number,
      default: 0,
    },
    TongTien: {
      type: Number,
      required: true,
    },
    DiaChiGiaoHang: {
      type: String,
      required: true,
    },
    PhuongThucThanhToan: {
      type: String,
      enum: ["cash", "credit_card", "bank_transfer", "e_wallet"],
      required: true,
    },
    TrangThaiDonHang: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    GhiChu: String,
    NgayDatHang: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const cart = await mongoose.model("Cart").findOne({ Id: this.GioHang.Id });
    const user = await mongoose.model("User").findById(this.NguoiDung.id);

    if (cart && user) {
      // Copy user information
      this.NguoiDung = {
        id: user._id,
        HoTen: user.HoTen,
        Email: user.Email,
        SoDienThoai: user.SoDienThoai,
      };

      // Copy cart information
      this.GioHang = {
        Id: cart.Id,
        DanhSachSanPham: cart.DanhSachSanPham,
        TongTienHang: cart.TongTienHang,
        GiamGia: cart.GiamGia,
        TamTinh: cart.TamTinh,
        TongTien: cart.TongTien,
      };

      // Calculate final total
      this.TongTien = cart.TongTien + this.PhiShip;

      // Update cart status
      cart.TrangThai = "ordered";
      await cart.save();
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
