import { Box, Button, Typography, Grid, Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from "@mui/icons-material/Star";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { handleFetchProductById, selectedProduct, sizes, fetchAllData, handleToggleFavorite } = useProduct();
  const { handleAddToCart, handleFetchCart } = useCart();
  const { getUser, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [mainImage, setMainImage] = useState("");
  console.log(sizes)
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  useEffect(() => {
    handleFetchProductById(id);
    fetchAllData()
    getUser()
  }, [id]);

  useEffect(() => {
    if (selectedProduct?.HinhAnh && selectedProduct.HinhAnh.length > 0) {
      setMainImage(selectedProduct.HinhAnh[0]);
    }
  }, [selectedProduct]);
  const handleAddProductToCart = async () => {
    if (!selectedSize) {
      toast.warning("Vui lòng chọn kích thước");
      return;
    }
    if (!selectedColor) {
      toast.warning("Vui lòng chọn màu sắc");
      return;
    }
    const cartItem = {
      user,
      idSanPham: selectedProduct.idSanPham,
      SoLuong: quantity,
      MauSac: selectedColor,
      KichThuoc: selectedSize,
    };
    try {
      const success = await handleAddToCart(cartItem);
      if (success) {
        await handleFetchCart();
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };
  const handleToggleFavoriteClick = async () => {
    if (!selectedProduct) return;
    try {
      const success = await handleToggleFavorite(selectedProduct.idSanPham);
      if (success) {
        toast.success("Đã cập nhật trạng thái yêu thích");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái yêu thích");
    }
  };
  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "20px" }}>
      <Typography sx={{ mb: 2, color: "#666" }}>
        Trang chủ / Quần / Quần Ngắn 3S
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Thumbnails */}
            <Box sx={{ width: 80 }}>
              {selectedProduct?.HinhAnh?.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: 80,
                    border:
                      mainImage === image
                        ? "2px solid #333"
                        : "1px solid #e1e1e1",
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={`http://localhost:8080${image}`}
                    alt={`Product thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
            {/* Main Image */}
            <Box sx={{ flex: 1, height: 600 }}>
              {mainImage && (
                <img
                  src={`http://localhost:8080${mainImage}`}
                  alt="Main product image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right side - Product info */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h1"
            sx={{ fontSize: 24, fontWeight: 500, mb: 2 }}
          >
            {selectedProduct?.TenSanPham}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} sx={{ color: "#666", fontSize: 16 }} />
              ))}
            </Box>
          </Box>
          <Typography
            sx={{ color: "#dc0606", fontSize: 24, fontWeight: 500, mb: 3 }}
          >
            {selectedProduct?.GiaSanPham?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Màu sắc:</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {selectedProduct?.MauSac?.map((color, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedColor(color.MaMau)}
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: color.MaMau,
                    border: "1px solid #ddd",
                    borderRadius: "50%",
                    cursor: "pointer",
                    outline:
                      selectedColor === color.MaMau ? "2px solid #000" : "none",
                    outlineOffset: 2,
                    position: "relative",
                    "&:hover": {
                      "&::after": {
                        content: `"${color.TenMau}"`,
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Size:</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {sizes.map((size) => (
                <Button
                  key={size.id}
                  variant={selectedSize === size.id ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size.id)}
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    bgcolor: selectedSize === size.id ? "#333" : "transparent",
                    color: selectedSize === size.id ? "#fff" : "#333",
                    border: "1px solid #ddd",
                    "&:hover": {
                      bgcolor: selectedSize === size.id ? "#333" : "transparent",
                    },
                  }}
                >
                  {size.TenKichThuoc}
                </Button>
              ))}
            </Box>
          </Box>
          {/* <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Số lượng:</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={handleDecrement}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  border: "1px solid #ddd",
                  color: "#333",
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
                  color: "#333",
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box> */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleToggleFavoriteClick}
              sx={{
                minWidth: "50px",
                height: "48px",
                border: "1px solid #ddd",
                color: selectedProduct?.YeuThich ? "#dc0606" : "#333",
                padding: 0,
                "&:hover": {
                  border: "1px solid #333",
                },
              }}
            >
              {selectedProduct?.YeuThich ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
            <Button
              variant="outlined"
              onClick={handleAddProductToCart}
              sx={{
                flex: 1,
                height: 48,
                border: "1px solid #333",
                color: "#333",
                "&:hover": {
                  border: "1px solid #333",
                  bgcolor: "transparent",
                },
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
                  bgcolor: "#000",
                },
              }}
              onClick={() => { navigate('/user/cart') }}
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
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Typography>Bài viết chi tiết</Typography>
              {showDetails ? <RemoveIcon /> : <AddIcon />}
            </Box>
            <Collapse in={showDetails}>
              <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedProduct?.TenSanPham}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Thông tin sản phẩm
                </Typography>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Mô tả:</strong> {selectedProduct?.MoTa || "Chưa có mô tả"}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Chất liệu:</strong> {selectedProduct?.ChatLieu || "Đang cập nhật"}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Màu sắc có sẵn:</strong> {selectedProduct?.MauSac?.map(color => color.TenMau).join(', ')}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Kích thước có sẵn:</strong> {sizes?.map(size => size.TenKichThuoc).join(', ')}
                    </Typography>
                  </li>
                  {selectedProduct?.ThongTinBoSung && (
                    <li>
                      <Typography sx={{ mb: 1 }}>
                        <strong>Thông tin thêm:</strong> {selectedProduct.ThongTinBoSung}
                      </Typography>
                    </li>
                  )}
                </ul>
                {selectedProduct?.HuongDanBaoQuan && (
                  <>
                    <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
                      Hướng dẫn bảo quản
                    </Typography>
                    <Typography sx={{ pl: 2.5 }}>
                      {selectedProduct.HuongDanBaoQuan}
                    </Typography>
                  </>
                )}
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
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Typography>Bảng size</Typography>
              {showSizeChart ? <RemoveIcon /> : <AddIcon />}
            </Box>
            <Collapse in={showSizeChart}>
              <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
                <Box
                  component="img"
                  src="../../../../public/image/size.jpg"
                  alt="Bảng size chart"
                  sx={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default ProductDetail;
