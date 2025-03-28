import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const SupplierManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const mockData = [
    { id: 1, code: "NCC001", name: "Công ty TNHH May Mặc ABC", contact: "Nguyễn Văn A", phone: "0901234567", address: "123 Lê Lợi, Q.1, TP.HCM", status: "Active" },
    { id: 2, code: "NCC002", name: "Xưởng May XYZ", contact: "Trần Thị B", phone: "0912345678", address: "456 Nguyễn Huệ, Q.1, TP.HCM", status: "Active" },
    { id: 3, code: "NCC003", name: "Công ty CP Thời Trang DEF", contact: "Lê Văn C", phone: "0923456789", address: "789 Đồng Khởi, Q.1, TP.HCM", status: "Inactive" },
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
        <Typography variant="h5">Danh sách nhà cung cấp</Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm nhà cung cấp"
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
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 3,
                height: '36px'
              }}
            >
              Thêm nhà cung cấp
            </Button>
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
                <TableCell>Mã NCC</TableCell>
                <TableCell>Tên nhà cung cấp</TableCell>
                <TableCell>Người liên hệ</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
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
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: row.status === 'Active' ? '#e8f5e9' : '#ffebee',
                        color: row.status === 'Active' ? '#2e7d32' : '#c62828',
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

export default SupplierManagement;