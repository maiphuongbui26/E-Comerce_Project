import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const PromotionManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const mockData = [
    { id: 1, code: "SUMMER23", name: "Khuyến mãi hè 2023", discount: "20%", startDate: "01.06.2023", endDate: "31.08.2023", status: "Active" },
    { id: 2, code: "FALL23", name: "Thu đông collection", discount: "15%", startDate: "01.09.2023", endDate: "30.11.2023", status: "Pending" },
    { id: 3, code: "NEWYEAR24", name: "Chào năm mới", discount: "25%", startDate: "20.12.2023", endDate: "10.01.2024", status: "Inactive" },
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
        <Typography variant="h5">Danh sách khuyến mãi</Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm khuyến mãi"
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
              Thêm khuyến mãi
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
                <TableCell>Mã KM</TableCell>
                <TableCell>Tên khuyến mãi</TableCell>
                <TableCell>Giảm giá</TableCell>
                <TableCell>Ngày bắt đầu</TableCell>
                <TableCell>Ngày kết thúc</TableCell>
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
                  <TableCell>{row.discount}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: 
                          row.status === 'Active' ? '#e8f5e9' : 
                          row.status === 'Pending' ? '#fff3e0' : '#ffebee',
                        color: 
                          row.status === 'Active' ? '#2e7d32' : 
                          row.status === 'Pending' ? '#e65100' : '#c62828',
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

export default PromotionManagement;