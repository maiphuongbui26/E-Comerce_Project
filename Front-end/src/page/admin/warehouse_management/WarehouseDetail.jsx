import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WarehouseDetail = () => {
  const { id } = useParams();
  const [warehouseData, setWarehouseData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch warehouse data
    // setWarehouseData(...)
    // setHistoryData(...)
  }, [id]);

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin kho hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Mã sản phẩm</Typography>
            <Typography>{id}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Tên sản phẩm</Typography>
            <Typography>Áo sơ mi trắng</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Số lượng hiện tại</Typography>
            <Typography>100</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Vị trí</Typography>
            <Typography>Kho A - Kệ 1</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lịch sử nhập xuất kho
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Người thực hiện</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Add history data here */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default WarehouseDetail;