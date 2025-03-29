import { Box, Typography, TextField, Button, FormControl, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productCode: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Box sx={{ 
        p: 2, 
        bgcolor: '#fff',
        borderRadius: '4px 4px 0 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InventoryIcon />
          <Typography variant="h5">Thêm sản phẩm mới</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              fullWidth
              label="Mã sản phẩm"
              value={formData.productCode}
              onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
            />
            <TextField
              fullWidth
              label="Tên sản phẩm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormControl fullWidth>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                displayEmpty
              >
                <MenuItem value="">Chọn danh mục</MenuItem>
                <MenuItem value="Áo">Áo</MenuItem>
                <MenuItem value="Quần">Quần</MenuItem>
                <MenuItem value="Váy">Váy</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Giá bán"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <TextField
              fullWidth
              label="Số lượng tồn"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
            <FormControl fullWidth>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Active">Đang bán</MenuItem>
                <MenuItem value="Inactive">Ngừng bán</MenuItem>
              </Select>
            </FormControl>
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
      </Paper>
    </>
  );
};

export default AddProduct;