import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useProduct } from '../../../hooks/useProduct';

const AddProduct = () => {
  const navigate = useNavigate();
  const { 
    productTypes, 
    prices, 
    sizes, 
    styles, 
    suppliers, 
    loading, 
    error, 
    fetchAllData 
  } = useProduct();

  const [formData, setFormData] = useState({
    TenSanPham: '',
    LoaiSanPham: { id: '', TenLoaiSanPham: '' },
    DonGia: { id: '', TenDonGia: '' },
    Style: { id: '', TenStyle: '', HinhAnh: '' },
    NhaCungCap: {
      idNhaCungCap: '',
      TenNhaCungCap: '',
      Email: '',
      SoDienThoai: '',
      DiaChi: '',
      MoTa: ''
    },
    GiaSanPham: '',
    SoLuong: 0,
    MoTa: '',
    MauSac: '',
    TrangThai: 'available',
    DanhGia: '',
    HinhAnh: [],
    YeuThich: false
  });

  useEffect(() => {
    fetchAllData();
  }, []); // Added dependency

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InventoryIcon />
          <Typography variant="h5">Thêm sản phẩm mới</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>Đang tải dữ liệu...</Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 3, color: 'error.main' }}>{error}</Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <TextField
                required
                fullWidth
                label="Tên sản phẩm"
                value={formData.TenSanPham}
                onChange={(e) => setFormData({ ...formData, TenSanPham: e.target.value })}
              />
              
              <FormControl fullWidth>
                <InputLabel>Loại sản phẩm</InputLabel>
                <Select
                  value={formData.LoaiSanPham.id}
                  label="Loại sản phẩm"
                  onChange={(e) => {
                    const selectedType = productTypes?.find(type => type.id === e.target.value);
                    if (selectedType) {
                      setFormData({
                        ...formData,
                        LoaiSanPham: {
                          id: selectedType.id,
                          TenLoaiSanPham: selectedType.TenLoaiSanPham
                        }
                      });
                    }
                  }}
                >
                  {productTypes?.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.TenLoaiSanPham}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Đơn giá</InputLabel>
                <Select
                  value={formData.DonGia.id}
                  label="Đơn giá"
                  onChange={(e) => {
                    const selectedPrice = prices.find(price => price.id === e.target.value);
                    if (selectedPrice) {
                      setFormData({
                        ...formData,
                        DonGia: {
                          id: selectedPrice.id,
                          TenDonGia: selectedPrice.TenDonGia
                        }
                      });
                    }
                  }}
                >
                  {prices.map(price => (
                    <MenuItem key={price.id} value={price.id}>
                      {price.TenDonGia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Style</InputLabel>
                <Select
                  value={formData.Style.id}
                  label="Style"
                  onChange={(e) => {
                    const selectedStyle = styles.find(style => style.id === e.target.value);
                    if (selectedStyle) {
                      setFormData({
                        ...formData,
                        Style: {
                          id: selectedStyle.id,
                          TenStyle: selectedStyle.TenStyle,
                          HinhAnh: selectedStyle.HinhAnh
                        }
                      });
                    }
                  }}
                >
                  {styles.map(style => (
                    <MenuItem key={style.id} value={style.id}>
                      {style.TenStyle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Nhà cung cấp</InputLabel>
                <Select
                  value={formData.NhaCungCap.idNhaCungCap}
                  label="Nhà cung cấp"
                  onChange={(e) => {
                    const selectedSupplier = suppliers.find(sup => sup.idNhaCungCap === e.target.value);
                    if (selectedSupplier) {
                      setFormData({
                        ...formData,
                        NhaCungCap: {
                          idNhaCungCap: selectedSupplier.idNhaCungCap,
                          TenNhaCungCap: selectedSupplier.TenNhaCungCap,
                          Email: selectedSupplier.Email,
                          SoDienThoai: selectedSupplier.SoDienThoai,
                          DiaChi: selectedSupplier.DiaChi,
                          MoTa: selectedSupplier.MoTa
                        }
                      });
                    }
                  }}
                >
                  {suppliers.map(supplier => (
                    <MenuItem key={supplier.idNhaCungCap} value={supplier.idNhaCungCap}>
                      {supplier.TenNhaCungCap}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            <TextField
              required
              fullWidth
              type="number"
              label="Giá sản phẩm"
              value={formData.GiaSanPham}
              onChange={(e) => setFormData({ ...formData, GiaSanPham: Number(e.target.value) })}
            />

<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, gridColumn: 'span 2' }}>
              <TextField
                required
                fullWidth
                type="number"
                label="Số lượng"
                value={formData.SoLuong}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  setFormData({ 
                    ...formData, 
                    SoLuong: newValue,
                    TrangThai: newValue > 0 ? 'available' : 'outOfStock'
                  });
                }}
              />

              <TextField
                fullWidth
                label="Màu sắc"
                value={formData.MauSac}
                onChange={(e) => setFormData({ ...formData, MauSac: e.target.value })}
              />

              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={formData.TrangThai}
                  label="Trạng thái"
                  onChange={(e) => setFormData({ ...formData, TrangThai: e.target.value })}
                >
                  <MenuItem value="available">Đang bán</MenuItem>
                  <MenuItem value="outOfStock">Hết hàng</MenuItem>
                  <MenuItem value="discontinued">Ngừng kinh doanh</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả"
              value={formData.MoTa}
              onChange={(e) => setFormData({ ...formData, MoTa: e.target.value })}
              sx={{ gridColumn: 'span 2' }}
            />

            <Box sx={{ gridColumn: 'span 2' }}>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  // Handle file uploads here
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/products')}
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Lưu
            </Button>
          </Box>
        </form>
      )}
    </Paper>
  </>
);
};

export default AddProduct;