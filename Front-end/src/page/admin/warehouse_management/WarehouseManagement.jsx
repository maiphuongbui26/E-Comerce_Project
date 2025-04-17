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
import { useNavigate, useLocation } from "react-router-dom";
import { useWarehouse } from "../../../hooks/useWarehouse";
import Checkbox from "@mui/material/Checkbox";

const WarehouseManagement = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { warehouses, handleFetchWarehouses, handleDeleteWarehouse } =
    useWarehouse();

  useEffect(() => {
    handleFetchWarehouses({ page, limit: rowsPerPage, search: searchTerm });
  }, [page, searchTerm]);
  const formatDate = (date) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleDateString("vi-VN");
    } catch {
      return "-";
    }
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm phiếu kho"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                ),
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => navigate("import")}
            >
              Nhập kho
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("export")}
            >
              Xuất kho
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã phiếu</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Ngày nhập kho</TableCell>
                <TableCell>Ngày xuất kho</TableCell>
                <TableCell>Hạn bán lô hàng</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouses.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.SanPham?.TenSanPham}</TableCell>
              
                  <TableCell>
                    {formatDate(item.NgayNhapKho)}
                  </TableCell>
                  <TableCell>
                    {formatDate(item.NgayXuatKho)}
                  </TableCell>
                  <TableCell>
                    {formatDate(item.HanBanLoHang)}
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
                      color="error"
                      onClick={() => handleDeleteWarehouse(item.id)}
                    >
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
