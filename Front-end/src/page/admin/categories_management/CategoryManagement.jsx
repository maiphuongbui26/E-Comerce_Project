// Update imports
import { 
  Box, Typography, TextField, IconButton, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Checkbox, Paper, Button, Pagination 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import CategoryDetailModal from './CategoryDetailModal';

const CategoryManagement = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const mockData = [
    { MaMuc: "01", TenMuc: "C_NhaCungCap", MoTa: "Quản lý nhà cung cấp" },
    { MaMuc: "02", TenMuc: "C_DanhMucSanPham", MoTa: "Quản lý danh mục sản phẩm" },
    { MaMuc: "03", TenMuc: "C_KichThuoc", MoTa: "Quản lý kích thước" },
    { MaMuc: "04", TenMuc: "C_LoaiSanPham", MoTa: "Quản lý loại sản phẩm" },
    { MaMuc: "05", TenMuc: "C_DonGia", MoTa: "Quản lý đơn giá" },
    { MaMuc: "06", TenMuc: "C_Style", MoTa: "Quản lý style" },
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

  // Handle checkbox selection
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(mockData.map(item => item.MaMuc));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (maMuc) => {
    setSelectedItems(prev => {
      if (prev.includes(maMuc)) {
        return prev.filter(id => id !== maMuc);
      } else {
        return [...prev, maMuc];
      }
    });
  };

  // Filter data based on search term
  const filteredData = mockData.filter(item =>
    item.TenMuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.MoTa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Typography variant="h5">Danh sách danh mục</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField 
            size="small"
            placeholder="Tìm kiếm danh mục"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          
          {selectedItems.length > 0 && (
            <Button 
              variant="contained" 
              color="error" 
              size="small"
              onClick={() => setSelectedItems([])}
            >
              Xóa đã chọn ({selectedItems.length})
            </Button>
          )}
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  <Checkbox 
                    checked={selectedItems.length === mockData.length}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < mockData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center">Mã danh mục</TableCell>
                <TableCell align="center">Tên danh mục</TableCell>
                <TableCell align="center">Mô tả</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.MaMuc}>
                  <TableCell padding="checkbox" align="center">
                    <Checkbox 
                      checked={selectedItems.includes(row.MaMuc)}
                      onChange={() => handleSelectItem(row.MaMuc)}
                    />
                  </TableCell>
                  <TableCell align="center">{row.MaMuc}</TableCell>
                  <TableCell align="center">{row.TenMuc}</TableCell>
                  <TableCell align="center">{row.MoTa}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenModal(row)}
                    >
                      <VisibilityIcon fontSize="small" sx={{ color: '#1976d2' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Rows per page:
            </Typography>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              style={{ padding: '4px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </Box>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            size="small"
          />
        </Box>
      </Box>

      <CategoryDetailModal
        open={openModal}
        onClose={handleCloseModal}
        category={selectedCategory}
        onUpdate={() => {
          // Refresh data here
          handleCloseModal();
        }}
      />
    </>
  );
};

export default CategoryManagement;