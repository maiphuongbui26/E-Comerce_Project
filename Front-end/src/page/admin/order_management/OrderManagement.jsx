import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const OrderManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const mockData = [
    { id: 1, orderNumber: "#9603", customerName: "Joe Schilder", location: "1631 Melgu Square, Ujdeme, Maldives - 56391", registered: "29.07.2023", status: "Confirm" },
    { id: 2, orderNumber: "#7174", customerName: "Phoebe Venturi", location: "1804 Ahedi Trail, Owottug, Bolivia - 47403", registered: "14.07.2023", status: "Complete" },
    { id: 3, orderNumber: "#2585", customerName: "Caroline Pandolfi", location: "1060 Ejeaba Square, Wouruno, Congo - 24456", registered: "10.07.2023", status: "Complete" },
  ];

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
        <Typography variant="h5">Danh sách đơn hàng</Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm đơn hàng"
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
        </Box>

        {/* Table */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.orderNumber}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.registered}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: row.status === 'Complete' ? '#e8f5e9' : row.status === 'Confirm' ? '#e3f2fd' : '#ffebee',
                        color: row.status === 'Complete' ? '#2e7d32' : row.status === 'Confirm' ? '#1565c0' : '#c62828',
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
                  <TableCell align="right">
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
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
    </>
  );
};

export default OrderManagement;