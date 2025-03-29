import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const mockData = [
    { id: 1, orderNumber: "#9603", customerName: "Joe Schilder", phone: "0123456789", address: "1631 Melgu Square", registered: "29.07.2023", status: "Confirm", total: "1,550,000đ" },
    { id: 2, orderNumber: "#7174", customerName: "Phoebe Venturi", phone: "0987654321", address: "1804 Ahedi Trail", registered: "14.07.2023", status: "Complete", total: "2,150,000đ" },
    { id: 3, orderNumber: "#2585", customerName: "Caroline Pandolfi", phone: "0369852147", address: "1060 Ejeaba Square", registered: "10.07.2023", status: "Pending", total: "850,000đ" },
  ];

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOpenModal(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: '#ffa726',
      Confirm: '#42a5f5',
      Shipping: '#ab47bc',
      Complete: '#66bb6a',
      Cancel: '#ef5350'
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
        <Typography variant="h5">Danh sách đơn hàng</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm đơn hàng"
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
              <MenuItem value="Pending">Chờ xác nhận</MenuItem>
              <MenuItem value="Confirm">Đã xác nhận</MenuItem>
              <MenuItem value="Shipping">Đang giao</MenuItem>
              <MenuItem value="Complete">Hoàn thành</MenuItem>
              <MenuItem value="Cancel">Đã hủy</MenuItem>
            </Select>
          </Box>
          {/* <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/orders/add')}
          >
            Thêm đơn hàng
          </Button> */}
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.orderNumber}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.registered}</TableCell>
                  <TableCell>{row.total}</TableCell>
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
                      onClick={() => navigate(`/admin/orders/edit/${row.id}`)}
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

export default OrderManagement;