import { Box, Typography, TextField, Button, FormControl, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: '',
    location: '',
    status: 'Active'
  });

  useEffect(() => {
    // Mock data - replace with API call
    setCategory({
      id: 1,
      name: "Áo",
      location: "Women's Fashion",
      status: "Active"
    });
  }, [id]);

  return (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <CategoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <EditIcon sx={{ 
              position: 'absolute', 
              right: 10, 
              bottom: -5, 
              fontSize: 20, 
              color: 'primary.main',
              bgcolor: '#fff',
              borderRadius: '50%'
            }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="600">
              Chỉnh sửa danh mục
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {id} - Cập nhật thông tin danh mục
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
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default EditCategory;