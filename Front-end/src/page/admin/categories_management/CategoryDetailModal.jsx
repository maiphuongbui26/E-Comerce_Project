import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CategoryDetailModal = ({ open, onClose, category }) => {
  // Separate mock data for each category type
  const mockDataMap = {
    C_NhaCungCap: [
      { id: "NCC001", name: "Công ty TNHH ABC", address: "123 Nguyễn Văn A, Q.1, TP.HCM", phone: "0123456789" },
      { id: "NCC002", name: "Công ty CP XYZ", address: "456 Lê Văn B, Q.2, TP.HCM", phone: "0987654321" },
      { id: "NCC003", name: "Doanh Nghiệp DEF", address: "789 Trần Văn C, Q.3, TP.HCM", phone: "0369852147" },
    ],
    C_DanhMucSanPham: [
      { id: "SP001", name: "Áo thun nam", category: "Áo", price: "299000" },
      { id: "SP002", name: "Quần jean nữ", category: "Quần", price: "499000" },
      { id: "SP003", name: "Váy dự tiệc", category: "Váy", price: "799000" },
    ],
    C_KichThuoc: [
      { id: "KT001", size: "S", description: "Small" },
      { id: "KT002", size: "M", description: "Medium" },
      { id: "KT003", size: "L", description: "Large" },
    ],
  };

  const renderTableHeaders = () => {
    switch(category?.TenMuc) {
      case 'C_NhaCungCap':
        return (
          <TableRow>
            <TableCell align="center">Mã NCC</TableCell>
            <TableCell align="center">Tên nhà cung cấp</TableCell>
            <TableCell align="center">Địa chỉ</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
          </TableRow>
        );
      case 'C_DanhMucSanPham':
        return (
          <TableRow>
            <TableCell align="center">Mã SP</TableCell>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Danh mục</TableCell>
            <TableCell align="center">Giá</TableCell>
          </TableRow>
        );
      case 'C_KichThuoc':
        return (
          <TableRow>
            <TableCell align="center">Mã KT</TableCell>
            <TableCell align="center">Kích thước</TableCell>
            <TableCell align="center">Mô tả</TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    const data = mockDataMap[category?.TenMuc] || [];
    
    return data.map((item) => {
      switch(category?.TenMuc) {
        case 'C_NhaCungCap':
          return (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.address}</TableCell>
              <TableCell align="center">{item.phone}</TableCell>
            </TableRow>
          );
        case 'C_DanhMucSanPham':
          return (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.category}</TableCell>
              <TableCell align="center">{item.price}</TableCell>
            </TableRow>
          );
        case 'C_KichThuoc':
          return (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.size}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
            </TableRow>
          );
        default:
          return null;
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            {category ? `Chi tiết ${category.TenMuc}` : 'Chi tiết danh mục'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {category ? (
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                {renderTableHeaders()}
              </TableHead>
              <TableBody>
                {renderTableRows()}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>Không có dữ liệu</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDetailModal;