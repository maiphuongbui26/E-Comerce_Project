import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, Radio, FormControlLabel, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

const Cart = () => {
  const [openVoucher, setOpenVoucher] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: '/path-to-image.jpg',
      name: 'Đầm cổ trơn dáng suông chân phối tơ - Đen - M',
      price: 795000,
      quantity: 1
    }
  ]);
  const vouchers = [
    { id: 1, code: 'SUMMER23', discount: '100.000đ', description: 'Giảm 100k cho đơn hàng từ 500k' },
    { id: 2, code: 'NEWYEAR', discount: '150.000đ', description: 'Giảm 150k cho đơn hàng từ 1000k' },
  ];

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const handleVoucherOpen = () => setOpenVoucher(true);
  const handleVoucherClose = () => setOpenVoucher(false);
  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
    handleVoucherClose();
  };

  return (
    <>
      <SearchForm />
      <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 600, mb: 2 }}
        >
          GIỎ HÀNG CỦA BẠN
        </Typography>
        <Typography sx={{ textAlign: "center", color: "#666", mb: 4 }}>
          Có 0 sản phẩm trong giỏ hàng
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
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box
                          component="img"
                          src={item.image}
                          sx={{
                            width: 100,
                            height: 133,
                            objectFit: 'cover'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Button
                          sx={{
                            color: '#666',
                            textTransform: 'none',
                            p: 0,
                            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                          }}
                        >
                          Xem lại
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <IconButton 
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            sx={{ border: '1px solid #ddd' }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: 20,fontWeight:600, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            sx={{ border: '1px solid #ddd' }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: '#dc0606',fontWeight:600 }}>
                          {item.price.toLocaleString()}đ
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ color: '#666' }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography sx={{ textAlign: "center", py: 4 }}>
              Bạn chưa có sản phẩm yêu thích nào !
            </Typography>
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: 1, bgcolor: "#f8f9fa", p: 3, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Tóm tắt đơn hàng
            </Typography>

            {/* Enhanced Voucher Button */}
            <Box sx={{ mb: 3, bgcolor: '#fff', borderRadius: 1, p: 2 }}>
              <Typography sx={{ mb: 1, fontSize: '0.875rem', color: '#666' }}>
                Mã giảm giá
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleVoucherOpen}
                sx={{
                  color: '#666',
                  borderColor: '#ddd',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#dc0606',
                    bgcolor: 'transparent'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {selectedVoucher ? (
                    <>
                      <Typography sx={{ color: '#dc0606', fontWeight: 600 }}>
                        {selectedVoucher.code}
                      </Typography>
                      <Typography sx={{ ml: 1, color: '#666' }}>
                        (-{selectedVoucher.discount})
                      </Typography>
                    </>
                  ) : (
                    <Typography>Chọn hoặc nhập mã</Typography>
                  )}
                </Box>
                <Typography sx={{ color: '#dc0606', fontWeight: 500 }}>
                  {selectedVoucher ? 'Thay đổi' : 'Áp dụng'}
                </Typography>
              </Button>
            </Box>

            {/* Enhanced Price Summary */}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tổng tiền hàng:</Typography>
              <Typography sx={{ fontWeight: 600 }}>0đ</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Giảm giá:</Typography>
              <Typography sx={{ fontWeight: 600 }}>- 0đ</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tạm tính:</Typography>
              <Typography sx={{ fontWeight: 600 }}>0đ</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography sx={{ fontWeight: 600 }}>Tổng tiền:</Typography>
              <Typography sx={{ color: "#dc0606", fontWeight: 600 }}>
                0đ
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
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
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Chọn mã giảm giá</Typography>
        <IconButton
          onClick={handleVoucherClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {vouchers.map((voucher) => (
          <Box
            key={voucher.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid #eee',
              '&:last-child': { borderBottom: 'none' }
            }}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={selectedVoucher?.id === voucher.id}
                  onChange={() => handleVoucherSelect(voucher)}
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {voucher.code}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {voucher.description}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={600}>
                    Giảm {voucher.discount}
                  </Typography>
                </Box>
              }
              sx={{ m: 0 }}
            />
          </Box>
        ))}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Cart;
