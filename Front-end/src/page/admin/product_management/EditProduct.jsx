import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useProduct } from "../../../hooks/useProduct";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    categories, // Change from productTypes to categories
    prices,
    styles,
    suppliers,
    loading,
    error,
    fetchAllData,
    handleUpdateProduct,
    handleFetchProductById,
  } = useProduct();

  const [formData, setFormData] = useState({
    TenSanPham: "",
    DanhMucSanPham: { id: "", TenDanhMuc: "" }, // Change from LoaiSanPham
    DonGia: { id: "", TenDonGia: "" },
    Style: { id: "", TenStyle: "", HinhAnh: "" },
    NhaCungCap: {
      idNhaCungCap: "",
      TenNhaCungCap: "",
      Email: "",
      SoDienThoai: "",
      DiaChi: "",
      MoTa: "",
    },
    GiaSanPham: "",
    SoLuong: null,
    MoTa: "",
    MauSac: "",
    TrangThai: "available",
    DanhGia: "",
    HinhAnh: [],
    YeuThich: false,
  });
  console.log(formData);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchAllData();
    loadProductData();
  }, [id]);

  const loadProductData = async () => {
    try {
      const response = await handleFetchProductById(id);
      if (response) {
        const productData = response.product || response;
        setFormData({
          ...formData,
          ...productData,
          TenSanPham: productData.TenSanPham || "",
          GiaSanPham: productData.GiaSanPham || "",
          SoLuong: productData.SoLuong || 0,
          MoTa: productData.MoTa || "",
          MauSac: productData.MauSac || "",
          TrangThai: productData.TrangThai || "available",
          DanhMucSanPham: productData.DanhMucSanPham || {
            id: "",
            TenDanhMuc: "",
          }, // Change from LoaiSanPham
          DonGia: productData.DonGia || { id: "", TenDonGia: "" },
          Style: productData.Style || { id: "", TenStyle: "", HinhAnh: "" },
          NhaCungCap: productData.NhaCungCap || {
            idNhaCungCap: "",
            TenNhaCungCap: "",
            Email: "",
            SoDienThoai: "",
            DiaChi: "",
            MoTa: "",
          },
        });

        if (productData.HinhAnh && productData.HinhAnh.length > 0) {
          const imageUrls = productData.HinhAnh.map(
            (img) => `http://localhost:8080${img}`
          );
          setExistingImages(productData.HinhAnh);
          setPreviewUrls(imageUrls);
        }
      }
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5 - existingImages.length;
    const selectedFiles = files.slice(0, maxFiles);

    setSelectedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    // Create preview URLs for new files
    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      const adjustedIndex = index - existingImages.length;
      setSelectedFiles((prev) => prev.filter((_, i) => i !== adjustedIndex));
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        HinhAnh: [...existingImages, ...selectedFiles],
      };

      const success = await handleUpdateProduct(id, productData);

      if (success) {
        // Clean up preview URLs
        previewUrls.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
        alert("Cập nhật sản phẩm thành công!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm!");
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EditIcon />
          <Typography variant="h5">Chỉnh sửa sản phẩm {id}</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>Đang tải dữ liệu...</Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 3, color: "error.main" }}>
            {error}
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                label="Tên sản phẩm"
                value={formData.TenSanPham}
                onChange={(e) =>
                  setFormData({ ...formData, TenSanPham: e.target.value })
                }
                required
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Danh mục sản phẩm</InputLabel>
                <Select
                  value={formData.DanhMucSanPham?.id || ""}
                  onChange={(e) => {
                    const selectedCategory = categories?.find(
                      (cat) => cat.id === e.target.value
                    );
                    setFormData({
                      ...formData,
                      DanhMucSanPham: selectedCategory,
                    });
                  }}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.TenDanhMuc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Đơn giá</InputLabel>
                <Select
                  value={formData.DonGia?.id || ""}
                  onChange={(e) => {
                    const selectedPrice = prices.find(
                      (price) => price.id === e.target.value
                    );
                    setFormData({ ...formData, DonGia: selectedPrice });
                  }}
                >
                  {prices.map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      {price.TenDonGia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Style</InputLabel>
                <Select
                  value={formData.Style?.id || ""}
                  onChange={(e) => {
                    const selectedStyle = styles.find(
                      (style) => style.id === e.target.value
                    );
                    setFormData({ ...formData, Style: selectedStyle });
                  }}
                >
                  {styles.map((style) => (
                    <MenuItem key={style.id} value={style.id}>
                      {style.TenStyle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Nhà cung cấp</InputLabel>
                <Select
                  value={formData.NhaCungCap?.idNhaCungCap || ""}
                  onChange={(e) => {
                    const selectedSupplier = suppliers.find(
                      (sup) => sup.idNhaCungCap === e.target.value
                    );
                    setFormData({ ...formData, NhaCungCap: selectedSupplier });
                  }}
                >
                  {suppliers.map((supplier) => (
                    <MenuItem
                      key={supplier.idNhaCungCap}
                      value={supplier.idNhaCungCap}
                    >
                      {supplier.TenNhaCungCap}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Giá sản phẩm"
                type="number"
                value={formData.GiaSanPham}
                onChange={(e) =>
                  setFormData({ ...formData, GiaSanPham: e.target.value })
                }
                required
                fullWidth
              />

              <TextField
                label="Số lượng"
                type="number"
                value={formData.SoLuong}
                onChange={(e) =>
                  setFormData({ ...formData, SoLuong: e.target.value })
                }
                required
                fullWidth
              />

              <TextField
                label="Màu sắc"
                value={formData.MauSac}
                onChange={(e) =>
                  setFormData({ ...formData, MauSac: e.target.value })
                }
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={formData.TrangThai}
                  onChange={(e) =>
                    setFormData({ ...formData, TrangThai: e.target.value })
                  }
                >
                  <MenuItem value="available">Đang bán</MenuItem>
                  <MenuItem value="outOfStock">Hết hàng</MenuItem>
                  <MenuItem value="discontinued">Ngừng kinh doanh</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              label="Mô tả"
              multiline
              rows={4}
              value={formData.MoTa}
              onChange={(e) =>
                setFormData({ ...formData, MoTa: e.target.value })
              }
              fullWidth
              sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Hình ảnh sản phẩm
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {previewUrls.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                    }}
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleRemoveImage(index, index < existingImages.length)
                      }
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "background.paper" },
                      }}
                    >
                      <CloseOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                {existingImages.length + selectedFiles.length < 5 && (
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadOutlinedIcon />}
                    sx={{
                      width: 100,
                      height: 100,
                      borderStyle: "dashed",
                    }}
                  >
                    Thêm ảnh
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                    />
                  </Button>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/admin/products")}
              >
                Quay lại
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Lưu thay đổi
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </>
  );
};

export default EditProduct;
