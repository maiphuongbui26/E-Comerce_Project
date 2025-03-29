import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const UserManagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');

  const mockData = [
    { 
      id: 1, 
      code: "KH001",
      name: "Nguyễn Văn A", 
      email: "nguyenvana@gmail.com",
      phone: "0901234567",
      address: "123 Lê Lợi, Q.1, TP.HCM",
      status: "Active"
    },
    { 
      id: 2, 
      code: "KH002",
      name: "Trần Thị B",
      email: "tranthib@gmail.com", 
      phone: "0912345678",
      address: "456 Nguyễn Huệ, Q.1, TP.HCM",
      status: "Active"
    },
    { 
      id: 3, 
      code: "KH003",
      name: "Lê Văn C",
      email: "levanc@gmail.com",
      phone: "0923456789",
      address: "789 Đồng Khởi, Q.1, TP.HCM",
      status: "Inactive"
    },
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
        <Typography variant="h5">Danh sách khách hàng</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm khách hàng"
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
              <MenuItem value="Active">Đang hoạt động</MenuItem>
              <MenuItem value="Inactive">Ngừng hoạt động</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/users/add')}
          >
            Thêm người dùng
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã KH</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.address}</TableCell>
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
                      onClick={() => navigate(`/admin/users/edit/${row.id}`)}
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

export default UserManagement;