import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');

  const mockData = [
    { id: 1, productCode: "SP001", name: "Áo sơ mi trắng", category: "Áo", price: "450,000đ", stock: "156", status: "Active" },
    { id: 2, productCode: "SP002", name: "Váy hoa nhí", category: "Váy", price: "650,000đ", stock: "89", status: "Active" },
    { id: 3, productCode: "SP003", name: "Quần jean ống rộng", category: "Quần", price: "850,000đ", stock: "45", status: "Inactive" },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Active: '#66bb6a',
      Inactive: '#ef5350'
    };
    return colors[status] || '#757575';
  };

  return (
    <>
      <Box sx={{ 
        p: 2, 
        bgcolor: '#fff', 
        borderRadius: '4px 4px 0 0',
        borderBottom: '1px solid #e0e0e0',
        mb: 2
      }}>
        <Typography variant="h5">Danh sách sản phẩm</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm sản phẩm"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
              sx={{ width: 250 }}
            />
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="Active">Đang bán</MenuItem>
              <MenuItem value="Inactive">Ngừng bán</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/products/add')}
          >
            Thêm sản phẩm
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã SP</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.productCode}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: `${getStatusColor(row.status)}20`,
                        color: getStatusColor(row.status),
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        fontSize: '0.875rem'
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      size="small"
                      onClick={() => navigate(`/admin/products/edit/${row.id}`)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon fontSize="small" sx={{ color: '#66bb6a' }} />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" sx={{ color: '#f44336' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ProductManagement;