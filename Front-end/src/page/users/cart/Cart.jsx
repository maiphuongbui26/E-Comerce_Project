import { Box, Button, Typography } from "@mui/material";
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

const Cart = () => {
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
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Giá tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Table content will go here when you have items */}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography sx={{ textAlign: "center", py: 4 }}>
              Bạn chưa có sản phẩm yêu thích nào !
            </Typography>
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Tóm tắt đơn hàng
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tổng tiền hàng:</Typography>
              <Typography>0đ</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Giảm giá:</Typography>
              <Typography>- 0đ</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tạm tính:</Typography>
              <Typography>0đ</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography sx={{ fontWeight: 600 }}>Tổng tiền:</Typography>
              <Typography sx={{ color: "#dc0606", fontWeight: 600 }}>
                0đ
              </Typography>
            </Box>

            <Box sx={{ bgcolor: "#f5f5f5", p: 2, mb: 2, borderRadius: 1 }}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                Trả sau 0đ với
                <img
                  src="/fundiin-logo.png"
                  alt="Fundiin"
                  style={{ height: 20 }}
                />
                <span style={{ cursor: "pointer" }}>?</span>
              </Typography>
              <Box
                sx={{
                  bgcolor: "linear-gradient(90deg, #00BFA6 0%, #7B66FF 100%)",
                  p: 2,
                  mt: 1,
                  borderRadius: 1,
                  color: "#fff",
                }}
              >
                Giảm đến 50K khi thanh toán qua Fundiin
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 4,
                    cursor: "pointer",
                  }}
                >
                  xem thêm
                </span>
              </Box>
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
    </>
  );
};

export default Cart;
