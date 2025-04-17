import {
  Box,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WarehouseManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const mockData = [
    {
      id: "WH001",
      productName: "Áo sơ mi trắng",
      quantity: 100,
      location: "Kho A - Kệ 1",
      lastUpdated: "2024-01-20",
      status: "inStock",
    },
    // Add more mock data...
  ];

  const getStatusColor = (status) => {
    const colors = {
      inStock: "#66bb6a",
      lowStock: "#ffa726",
      outOfStock: "#ef5350",
    };
    return colors[status] || "#757575";
  };

  const getStatusText = (status) => {
    const statusMap = {
      inStock: "Còn hàng",
      lowStock: "Sắp hết",
      outOfStock: "Hết hàng",
    };
    return statusMap[status] || status;
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid #e0e0e0",
          mb: 2,
        }}
      >
        <Typography variant="h5">Quản lý kho hàng</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm sản phẩm"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                ),
              }}
              sx={{ width: 250 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="inStock">Còn hàng</MenuItem>
              <MenuItem value="lowStock">Sắp hết</MenuItem>
              <MenuItem value="outOfStock">Hết hàng</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/warehouse/add")}
          >
            Thêm mới
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã SP</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Cập nhật cuối</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: `${getStatusColor(item.status)}15`,
                        color: getStatusColor(item.status),
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {getStatusText(item.status)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/admin/warehouse/${item.id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/admin/warehouse/edit/${item.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={5}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
          />
        </Box>
      </Box>
    </>
  );
};

export default WarehouseManagement;