// Update imports
import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Thêm import
import CategoryDetailModal from './CategoryDetailModal';

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Add modal states
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const mockData = [
    { MaMuc: "01", TenMuc: "C_NhaCungCap" },
    { MaMuc: "02", TenMuc: "C_DanhMucSanPham" },
    { MaMuc: "03", TenMuc: "C_KichThuoc" },
  ];

  // Handle modal actions
  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setOpenModal(false);
  };

  return (
    <>
      {/* Title Section */}
      <Box sx={{ 
        p: 2, 
        bgcolor: '#fff', 
        borderRadius: '4px 4px 0 0',
        borderBottom: '1px solid #e0e0e0',
        mb: 2
      }}>
        <Typography variant="h5">Danh sách danh mục</Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm danh mục"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
              sx={{ 
                width: 250,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  height: '36px',
                  bgcolor: '#f8f9fa'
                }
              }}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/admin/categories/add')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 3,
                height: '36px'
              }}
            >
              Thêm danh mục
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  <Checkbox />
                </TableCell>
                <TableCell align="center">Mã danh mục</TableCell>
                <TableCell align="center">Tên danh mục</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row,index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox" align="center">
                    <Checkbox />
                  </TableCell>
                  <TableCell align="center">{row.MaMuc}</TableCell>
                  <TableCell align="center">{row.TenMuc}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      size="small" 
                      sx={{ mr: 1 }}
                      onClick={() => handleOpenModal(row)}
                    >
                      <VisibilityIcon fontSize="small" sx={{ color: '#1976d2' }} />
                    </IconButton>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <DeleteIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                    </IconButton>
                    <IconButton 
                      size="small"
                      onClick={() => navigate(`/admin/categories/edit/${row.id}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary" mr={2}>
            Rows per page:
          </Typography>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            style={{ marginRight: 20 }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <Typography variant="body2" color="text.secondary">
            1-5 of 100
          </Typography>
        </Box>
      </Box>
      {/* Add Modal */}
      <CategoryDetailModal
        open={openModal}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </>
  );
};

export default CategoryManagement;