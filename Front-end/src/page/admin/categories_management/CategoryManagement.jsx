

import { 
  Box, Typography, TextField, IconButton, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Pagination 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { categoryFormConfigs } from '../../../constants/categoryFormConfigs';
import { useNavigate } from 'react-router-dom';

const CategoryManagement = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Thay đổi useEffect để gọi fetchCategories khi component được mount và khi searchTerm thay đ
  useEffect(() => {
    fetchCategories();
  }, []);

  // Thay đổi fetchCategories để tạo dữ liệu từ categoryFormConfigs
  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Include endpoint from API field in categoryFormConfigs
      const categoriesList = Object.keys(categoryFormConfigs).map(key => {
        const apiField = categoryFormConfigs[key].find(field => field.id === 'API');
        return {
          MaMuc: key,
          TenMuc: key,
          MoTa: `Danh mục ${key.replace('C_', '')}`,
          endpoint: apiField?.endpoint || key.toLowerCase()
        };
      });
      setCategories(categoriesList);
    } catch (err) {
      setError('Không thể tải danh sách danh mục');
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Thêm kiểm tra trước khi filter
  const filteredData = Array.isArray(categories) 
    ? categories.filter(item =>
        item.TenMuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.MoTa.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Replace modal handling with navigation
  const handleViewCategory = (category) => {
    navigate(`/admin/categories/${category.MaMuc}`, { state: { category } });
  };

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
        </Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã danh mục</TableCell>
                <TableCell align="center">Tên danh mục</TableCell>
                <TableCell align="center">Số trường dữ liệu</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Đang tải...</TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.MaMuc}</TableCell>
                    <TableCell align="center">{row.MaMuc.replace('C_', '')}</TableCell>
                    <TableCell align="center">{categoryFormConfigs[row.MaMuc].length} trường</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewCategory(row)}
                      >
                        <VisibilityIcon fontSize="small" sx={{ color: '#1976d2' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
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

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CategoryManagement;