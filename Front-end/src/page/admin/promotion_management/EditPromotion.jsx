import { Box, Typography, TextField, Button, FormControl, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const EditPromotion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    discount: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  useEffect(() => {
    // Mock data fetch
    const mockPromotion = {
      code: 'SUMMER23',
      name: 'Khuyến mãi hè 2023',
      discount: '20',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: 'Active'
    };
    setFormData(mockPromotion);
  }, [id]);

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
          <EditIcon />
          <Typography variant="h5">Chỉnh sửa khuyến mãi {formData.code}</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              fullWidth
              label="Mã khuyến mãi"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
            <TextField
              fullWidth
              label="Tên khuyến mãi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Giảm giá (%)"
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            />
            <FormControl fullWidth>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Active">Đang áp dụng</MenuItem>
                <MenuItem value="Pending">Chờ áp dụng</MenuItem>
                <MenuItem value="Inactive">Ngừng áp dụng</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/promotions')}
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

export default EditPromotion;