import { Box, Typography, TextField, Button, FormControl, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CategoryIcon from '@mui/icons-material/Category';

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    location: '',
    status: 'Active'
  });

  return (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CategoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h5" fontWeight="600">
              Thêm danh mục mới
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Điền thông tin chi tiết để tạo danh mục mới
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Box sx={{ 
          maxWidth: 700,
          mx: 'auto',
          '& .MuiTextField-root': { mb: 3 }
        }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontWeight="500" mb={1}>
              Thông tin cơ bản
            </Typography>
            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
              <TextField
                fullWidth
                label="Tên danh mục"
                placeholder="Nhập tên danh mục"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
              />

              <TextField
                fullWidth
                label="Vị trí hiển thị"
                placeholder="Ví dụ: Women's Fashion"
                value={category.location}
                onChange={(e) => setCategory({ ...category, location: e.target.value })}
              />

              <FormControl fullWidth>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Trạng thái
                </Typography>
                <Select
                  value={category.status}
                  onChange={(e) => setCategory({ ...category, status: e.target.value })}
                  sx={{ bgcolor: '#fff' }}
                >
                  <MenuItem value="Active">Hoạt động</MenuItem>
                  <MenuItem value="Inactive">Không hoạt động</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/categories')}
              sx={{ px: 3 }}
            >
              Quay lại
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ px: 3 }}
            >
              Lưu danh mục
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default AddCategory;