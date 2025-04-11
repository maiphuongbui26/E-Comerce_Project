import { Box, Button, Typography, Grid, Collapse } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("white");
  const [showDetails, setShowDetails] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "20px" }}>
      <Typography sx={{ mb: 2, color: '#666' }}>
        Trang chủ / Quần / Quần Ngắn 3S
      </Typography>

      <Grid container spacing={4}>
        {/* Left side - Image gallery */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: 80 }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
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
                  <img src="/path-to-thumbnail.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Box>
            <Box sx={{ flex: 1, height: 600 }}>
              <img src="/path-to-main-image.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </Box>
          </Box>
        </Grid>

        {/* Right side - Product info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 500, mb: 2 }}>
            Quần sooc phối lé gấu
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography sx={{ color: '#666' }}>SKU: 3S04.2502K</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {[1,2,3,4,5].map((star) => (
                <StarIcon key={star} sx={{ color: '#666', fontSize: 16 }} />
              ))}
              <Typography sx={{ color: '#666' }}>(0)</Typography>
              <Typography sx={{ color: '#666' }}>0 Nhận xét</Typography>
            </Box>
          </Box>

          <Typography sx={{ color: "#dc0606", fontSize: 24, fontWeight: 500, mb: 3 }}>
            455,000đ
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Màu sắc:</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box 
                onClick={() => setSelectedColor("white")}
                sx={{ 
                  width: 30, 
                  height: 30, 
                  bgcolor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                  cursor: "pointer",
                  outline: selectedColor === "white" ? "2px solid #000" : "none",
                  outlineOffset: 2
                }} 
              />
              <Box 
                onClick={() => setSelectedColor("beige")}
                sx={{ 
                  width: 30, 
                  height: 30, 
                  bgcolor: "#F5F5DC",
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                  cursor: "pointer",
                  outline: selectedColor === "beige" ? "2px solid #000" : "none",
                  outlineOffset: 2
                }} 
              />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Size:</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {["L", "M", "S"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    bgcolor: selectedSize === size ? "#333" : "transparent",
                    color: selectedSize === size ? "#fff" : "#333",
                    border: "1px solid #ddd",
                    "&:hover": {
                      bgcolor: selectedSize === size ? "#333" : "transparent",
                    }
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Số lượng:</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button 
                variant="outlined" 
                onClick={handleDecrement}
                sx={{ 
                  minWidth: "40px", 
                  height: "40px",
                  border: "1px solid #ddd",
                  color: "#333"
                }}
              >
                <RemoveIcon />
              </Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button 
                variant="outlined" 
                onClick={handleIncrement}
                sx={{ 
                  minWidth: "40px", 
                  height: "40px",
                  border: "1px solid #ddd",
                  color: "#333"
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                minWidth: "50px",
                height: "48px",
                border: "1px solid #ddd",
                color: "#333",
                padding: 0,
                "&:hover": {
                  border: "1px solid #333"
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FavoriteBorderIcon />
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                flex: 1,
                height: 48,
                border: "1px solid #333",
                color: "#333",
                "&:hover": {
                  border: "1px solid #333",
                  bgcolor: "transparent"
                }
              }}
            >
              THÊM VÀO GIỎ HÀNG
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                flex: 1,
                height: 48,
                bgcolor: "#333",
                "&:hover": {
                  bgcolor: "#000"
                }
              }}
            >
              MUA NGAY
            </Button>
          </Box>

          <Box>
            <Box 
              onClick={() => setShowDetails(!showDetails)}
              sx={{ 
                p: 2, 
                cursor: "pointer",
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { bgcolor: "#f5f5f5" }
              }}
            >
              <Typography>Bài viết chi tiết</Typography>
              {showDetails ? <RemoveIcon /> : <AddIcon />}
            </Box>
            <Collapse in={showDetails}>
              <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  QUẦN SOOC PHỐI LÉ GẤU – NĂNG ĐỘNG & TINH TẾ
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>1.Điểm nổi bật của sản phẩm</Typography>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>Thiết kế quần sooc hiện đại với chi tiết phối lé phần gấu, tạo điểm nhấn tinh tế.</li>
                  <li>Hai ly chết giúp quần giữ phom tốt, tôn dáng người mặc.</li>
                  <li>Màu sắc: Be/Xanh Đá – thanh lịch, dễ phối đồ.</li>
                  <li>Chất liệu: Polyester Weft Stripe cao cấp – mềm mại, thoáng khí, giữ form tốt.</li>
                </ul>
              </Box>
            </Collapse>

            <Box 
              onClick={() => setShowSizeChart(!showSizeChart)}
              sx={{ 
                p: 2, 
                cursor: "pointer",
                borderTop: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { bgcolor: "#f5f5f5" }
              }}
            >
              <Typography>Bảng size</Typography>
              {showSizeChart ? <RemoveIcon /> : <AddIcon />}
            </Box>
            <Collapse in={showSizeChart}>
              <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
                {/* Add your size chart content here */}
                <Typography>Nội dung bảng size...</Typography>
              </Box>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;