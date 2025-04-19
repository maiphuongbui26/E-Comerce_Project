import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Radio,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SearchForm from "../../../component/header/SearchForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"; // Add these imports
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { useCart } from "../../../hooks/useCart";
import { useProduct } from "../../../hooks/useProduct";
import { useDiscount } from "../../../hooks/useDiscount";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { useAuth } from "../../../hooks/useAuth";
import { toast,ToastContainer } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const {
    handleFetchCart,
    cartItems,
    handleUpdateCartItem,
    handleRemoveFromCart,
    handleRemoveAllFromCart
  } = useCart();
  const { handleFetchDiscounts, discounts } = useDiscount();
  const { handleFetchProducts, products } = useProduct();
  const { handleCreateOrder } = useOrder();
  const { user } = useAuth();
  console.log("cartItems", cartItems);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const consolidatedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.idSanPham === item.idSanPham);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);
  const handleQuantityChange = async (idSanPham, change) => {
    const item = consolidatedCartItems.find(
      (item) => item.idSanPham === idSanPham
    );
    if (!item) return;

    if (change < 0) {
      try {
        await handleRemoveFromCart(idSanPham);
        await handleFetchCart();
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      const newQuantity = item.quantity + change;
      try {
        await handleUpdateCartItem(idSanPham, newQuantity);
        await handleFetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleDeleteCartItem = async (idSanPham) => {
    try {
      await handleRemoveAllFromCart(idSanPham);
      await handleFetchCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };
  const handleVoucherOpen = () => setOpenVoucher(true);
  const handleVoucherClose = () => setOpenVoucher(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher); // Set the selected voucher first
    // Tính số tiền được giảm dựa trên phần trăm và làm tròn số
    const discount = Math.floor((totalAmount * voucher.PhanTramGiam) / 100);
    setDiscountAmount(discount);
    handleVoucherClose();
  };

  useEffect(() => {
    handleFetchCart();
    handleFetchProducts();
    handleFetchDiscounts();
    // Example usage within the component
  }, []);

  const totalAmount = consolidatedCartItems.reduce((sum, item) => {
    return sum + item.GiaTien * item.quantity;
  }, 0);
  // Consolidate cart items by idSanPham
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để tiến hành đặt hàng", {
        autoClose: 3000, // Hiển thị toast trong 3 giây
      });
      setTimeout(() => {
        navigate("/auth/user/login");
      }, 3000); // Chờ 3 giây rồi mới chuyển trang
      return;
    }

    if (consolidatedCartItems.length === 0) {
      return;
    }

    try {
      const orderData = {
        GioHang: {
          DanhSachSanPham: consolidatedCartItems.map((item) => ({
            idSanPham: item.idSanPham,
            TenSanPham: item.TenSanPham,
            LoaiSanPham: item.LoaiSanPham,
            DanhMuc: item.DanhMuc,
            DonGia: item.DonGia,
            HinhAnh: item.HinhAnh,
            SoLuong: item.quantity,
            MauSac: item.MauSac,
            KichThuoc: item.KichThuoc,
            GiaTien: item.GiaTien,
            ThanhTien: item.GiaTien * item.quantity,
          })),
          TongTienHang: totalAmount,
          GiamGia: discountAmount,
          TamTinh: totalAmount - discountAmount,
          TongTien: totalAmount - discountAmount
        },
        TrangThaiDonHang: "pending",
        PhuongThucThanhToan: "cash", 
        DiaChiGiaoHang: "Địa chỉ mặc định", 
        GhiChu: "" 
      };
  
      const result = await handleCreateOrder(orderData);
  
      if (result) {
        await handleFetchCart();
        navigate("/user/order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <>
      <SearchForm />
      <Box sx={{ maxWidth: "1240px", margin: "30px auto", padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 600, mb: 2 }}
        >
          GIỎ HÀNG CỦA BẠN
        </Typography>
        <Typography sx={{ textAlign: "center", color: "#666", mb: 4 }}>
          Có {consolidatedCartItems.length} sản phẩm trong giỏ hàng
        </Typography>

        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Cart Items */}
          <Box sx={{ flex: 2 }}>
            <TableContainer component={Paper} sx={{ mb: 2, boxShadow: "none" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell sx={{ width: "150px" }}>Hình ảnh</TableCell>
                    <TableCell>Thông tin</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Giá tiền</TableCell>
                    <TableCell align="right" sx={{ width: "50px" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consolidatedCartItems.map((cartItem) => (
                    <TableRow key={cartItem.idSanPham}>
                      <TableCell>
                        <img
                          src={`http://localhost:8080${cartItem?.HinhAnh}`}
                          alt={cartItem?.TenSanPham}
                          width={80}
                          height={80}
                          style={{ objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {cartItem?.TenSanPham}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(cartItem.idSanPham, -1)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 2 }}>
                            {cartItem.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(cartItem.idSanPham, 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {(cartItem?.GiaTien * cartItem.quantity).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            handleDeleteCartItem(cartItem.idSanPham)
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {cartItems.length === 0 && (
              <Typography sx={{ textAlign: "center", py: 4 }}>
                Bạn chưa có sản phẩm yêu thích nào !
              </Typography>
            )}
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: 1, bgcolor: "#f8f9fa", p: 3, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Tóm tắt đơn hàng
            </Typography>

            <Box sx={{ mb: 3, bgcolor: "#fff", borderRadius: 1, p: 2 }}>
              <Typography sx={{ mb: 1, fontSize: "0.875rem", color: "#666" }}>
                Mã giảm giá
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleVoucherOpen}
                sx={{
                  color: "#666",
                  borderColor: "#ddd",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.5,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#dc0606",
                    bgcolor: "transparent",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {selectedVoucher ? (
                    <>
                      <Typography sx={{ color: "#dc0606", fontWeight: 600 }}>
                        {selectedVoucher.TenChuongTrinh}
                      </Typography>
                      <Typography sx={{ ml: 1, color: "#666" }}>
                        (-{selectedVoucher.PhanTramGiam}%)
                      </Typography>
                    </>
                  ) : (
                    <Typography>Chọn hoặc nhập mã</Typography>
                  )}
                </Box>
                <Typography sx={{ color: "#dc0606", fontWeight: 500 }}>
                  {selectedVoucher ? "Thay đổi" : "Áp dụng"}
                </Typography>
              </Button>
            </Box>

            {/* Enhanced Price Summary */}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tổng tiền hàng:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {totalAmount.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Giảm giá:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                -{discountAmount.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tạm tính:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {(totalAmount - discountAmount).toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography sx={{ fontWeight: 600 }}>Tổng tiền:</Typography>
              <Typography sx={{ color: "#dc0606", fontWeight: 600 }}>
                {(totalAmount - discountAmount).toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handlePlaceOrder}
              disabled={consolidatedCartItems.length === 0}
              sx={{
                bgcolor: "#dc0606",
                mb: 2,
                "&:hover": { bgcolor: "#b00404" },
              }}
            >
              TIẾN HÀNH ĐẶT HÀNG
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "#303030",
                borderColor: "#303030",
                "&:hover": {
                  borderColor: "#303030",
                  bgcolor: "rgba(48, 48, 48, 0.04)",
                },
              }}
            >
              MUA THÊM SẢN PHẨM
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openVoucher}
        onClose={handleVoucherClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Chọn mã giảm giá</Typography>
          <IconButton
            onClick={handleVoucherClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {discounts.map((voucher) => (
            <Box
              key={voucher.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                p: 2,
                borderBottom: "1px solid #eee",
                "&:last-child": { borderBottom: "none" },
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                borderRadius: 1,
                transition: "all 0.2s",
              }}
            >
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedVoucher?.id === voucher.id}
                    onChange={() => handleVoucherSelect(voucher)}
                    sx={{
                      "&.Mui-checked": {
                        color: "#dc0606",
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ ml: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="primary"
                      >
                        {voucher.TenChuongTrinh}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: "#dc0606",
                          color: "white",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: 600,
                        }}
                      >
                        -{voucher.PhanTramGiam}%
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Mã:{" "}
                      <span style={{ fontWeight: 600, color: "#dc0606" }}>
                        {voucher.id}
                      </span>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      Hiệu lực:{" "}
                      {new Date(voucher.NgayBatDau).toLocaleDateString("vi-VN")}{" "}
                      -{" "}
                      {new Date(voucher.NgayKetThuc).toLocaleDateString(
                        "vi-VN"
                      )}
                    </Typography>
                  </Box>
                }
                sx={{
                  m: 0,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "rgba(220, 6, 6, 0.04)",
                  },
                }}
              />
            </Box>
          ))}
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default Cart;
