import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("115");

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "40px 20px" }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left side - Image gallery */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: 80 }}>
              {/* Thumbnail images */}
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  sx={{
                    width: "100%",
                    height: 80,
                    border: "1px solid #e1e1e1",
                    mb: 1,
                    cursor: "pointer"
                  }}
                >
                  <img src="" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Box>
            {/* Main image */}
            <Box sx={{ flex: 1, height: 500, bgcolor: "#f5f5f5" }}>
              <img src="" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </Box>
          </Box>
        </Box>

        {/* Right side - Product info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, mb: 2 }}>
            Thắt Lưng Nam Khoá Tự Động Phối Nhám
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography>TLM7022-NAU-115</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              ⭐⭐⭐⭐⭐
              <Typography>4.8 (120)</Typography>
              <Typography sx={{ ml: 2 }}>Đã bán 58</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 3 }}>
            <Typography sx={{ color: "#dc0606", fontSize: 24, fontWeight: 600 }}>
              399.200 đ
            </Typography>
            <Typography sx={{ color: "#666", textDecoration: "line-through" }}>
              499.000 đ
            </Typography>
            <Typography sx={{ color: "#dc0606" }}>-20%</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography sx={{ color: "#666" }}>
              60 người đang xem sản phẩm này
            </Typography>
          </Box>

          <Typography sx={{ color: "#dc0606", mb: 3 }}>
            Chỉ còn 94 sản phẩm trong kho!
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Màu sắc: Nâu</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ width: 40, height: 40, bgcolor: "#8B4513", borderRadius: "50%", cursor: "pointer" }} />
              <Box sx={{ width: 40, height: 40, bgcolor: "#000", borderRadius: "50%", cursor: "pointer" }} />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Kích thước: {selectedSize}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button 
                variant={selectedSize === "115" ? "contained" : "outlined"}
                onClick={() => setSelectedSize("115")}
                sx={{ bgcolor: selectedSize === "115" ? "#dc0606" : "transparent" }}
              >
                115
              </Button>
              <Button 
                variant={selectedSize === "125" ? "contained" : "outlined"}
                onClick={() => setSelectedSize("125")}
                sx={{ bgcolor: selectedSize === "125" ? "#dc0606" : "transparent" }}
              >
                125
              </Button>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Số lượng:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button 
                variant="outlined" 
                onClick={handleDecrement}
                sx={{ minWidth: "40px", height: "40px" }}
              >
                <RemoveIcon />
              </Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button 
                variant="outlined" 
                onClick={handleIncrement}
                sx={{ minWidth: "40px", height: "40px" }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button 
              variant="outlined" 
              sx={{ 
                flex: 1, 
                height: 48,
                color: "#dc0606",
                borderColor: "#dc0606",
                "&:hover": {
                  borderColor: "#dc0606",
                  bgcolor: "rgba(220, 6, 6, 0.04)"
                }
              }}
            >
              Thêm vào giỏ
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                flex: 1, 
                height: 48,
                bgcolor: "#dc0606",
                "&:hover": {
                  bgcolor: "#b00404"
                }
              }}
            >
              Mua ngay
            </Button>
          </Box>

          <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box component="img" src="/path-to-shipping-icon.png" sx={{ width: 24 }} />
              <Typography>Miễn phí vận chuyển: Đơn hàng từ 498k</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box component="img" src="/path-to-delivery-icon.png" sx={{ width: 24 }} />
              <Typography>Giao hàng: Từ 3 - 5 ngày trên cả nước</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box component="img" src="/path-to-return-icon.png" sx={{ width: 24 }} />
              <Typography>Miễn phí đổi trả: Tại 267+ cửa hàng trong 15 ngày</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;