import { Box, Typography, TextField, Button, FormControl, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';

const AddSupplier = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    contact: '',
    phone: '',
    address: '',
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
          <BusinessIcon />
          <Typography variant="h5">Thêm nhà cung cấp mới</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              fullWidth
              label="Mã nhà cung cấp"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
            <TextField
              fullWidth
              label="Tên nhà cung cấp"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Người liên hệ"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              sx={{ gridColumn: 'span 2' }}
            />
            <FormControl fullWidth>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Active">Đang hợp tác</MenuItem>
                <MenuItem value="Inactive">Ngừng hợp tác</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/suppliers')}
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

export default AddSupplier;