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
  Box,
  Button,
  TextField,
  Divider,
  Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const CategoryDetailModal = ({ open, onClose, category }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Render form based on category type
  // Form field configurations for each category
    const formConfigs = {
      C_NhaCungCap: [
        { id: 'id', label: 'Mã nhà cung cấp', field: 'id' },
        { id: 'name', label: 'Tên nhà cung cấp', field: 'name' },
        { id: 'address', label: 'Địa chỉ', field: 'address' },
        { id: 'phone', label: 'Số điện thoại', field: 'phone' }
      ],
      C_DanhMucSanPham: [
        { id: 'id', label: 'Mã sản phẩm', field: 'id' },
        { id: 'name', label: 'Tên sản phẩm', field: 'name' },
        { id: 'category', label: 'Danh mục', field: 'category' },
        { id: 'price', label: 'Giá', field: 'price', type: 'number' }
      ],
      C_KichThuoc: [
        { id: 'id', label: 'Mã kích thước', field: 'id' },
        { id: 'size', label: 'Kích thước', field: 'size' },
        { id: 'description', label: 'Mô tả', field: 'description' }
      ]
    };
  
    const getFormTitle = (categoryType) => {
      const titles = {
        C_NhaCungCap: 'nhà cung cấp',
        C_DanhMucSanPham: 'sản phẩm',
        C_KichThuoc: 'kích thước'
      };
      return titles[categoryType] || 'danh mục';
    };
  
    const renderForm = () => {
      if (!category?.TenMuc) return null;
  
      const fields = formConfigs[category.TenMuc] || [];
      const formTitle = getFormTitle(category.TenMuc);
  
      return (
        <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {isAdding ? `Thêm ${formTitle} mới` : `Cập nhật ${formTitle}`}
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gap: 2, 
            gridTemplateColumns: `repeat(${fields.length > 3 ? 2 : 1}, 1fr)` 
          }}>
            {fields.map(field => (
              <TextField
                key={field.id}
                fullWidth
                size="small"
                type={field.type || 'text'}
                label={field.label}
                value={formData[field.field] || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [field.field]: e.target.value 
                })}
              />
            ))}
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({});
              }}
            >
              Hủy
            </Button>
            <Button 
              variant="contained" 
              size="small"
            >
              {isAdding ? 'Thêm' : 'Cập nhật'}
            </Button>
          </Box>
        </Box>
      );
    };

  // Mock data for each category
  const mockDataMap = {
    C_NhaCungCap: [
      { id: "NCC001", name: "Công ty TNHH ABC", address: "123 Nguyễn Văn A, Q.1, TP.HCM", phone: "0123456789" },
      { id: "NCC002", name: "Công ty CP XYZ", address: "456 Lê Văn B, Q.2, TP.HCM", phone: "0987654321" },
    ],
    C_DanhMucSanPham: [
      { id: "SP001", name: "Áo thun nam", category: "Áo", price: "299000" },
      { id: "SP002", name: "Quần jean nữ", category: "Quần", price: "499000" },
    ],
    C_KichThuoc: [
      { id: "KT001", size: "S", description: "Small" },
      { id: "KT002", size: "M", description: "Medium" },
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
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        );
      case 'C_DanhMucSanPham':
        return (
          <TableRow>
            <TableCell align="center">Mã SP</TableCell>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Danh mục</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        );
      case 'C_KichThuoc':
        return (
          <TableRow>
            <TableCell align="center">Mã KT</TableCell>
            <TableCell align="center">Kích thước</TableCell>
            <TableCell align="center">Mô tả</TableCell>
            <TableCell align="center">Thao tác</TableCell>
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
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton 
                    size="small" 
                    onClick={() => {
                      setEditingId(item.id);
                      setFormData(item);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        case 'C_DanhMucSanPham':
          return (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.category}</TableCell>
              <TableCell align="center">{item.price}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton 
                    size="small"
                    onClick={() => {
                      setEditingId(item.id);
                      setFormData(item);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        case 'C_KichThuoc':
          return (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.size}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton 
                    size="small"
                    onClick={() => {
                      setEditingId(item.id);
                      setFormData(item);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
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
            {category ? `Quản lý ${category.TenMuc}` : 'Chi tiết danh mục'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {category && (
          <>
            {/* Action Buttons */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                  setFormData({});
                }}
                size="small"
              >
                Thêm mới
              </Button>
            </Box>

            {/* Form Section */}
            {(isAdding || editingId) && renderForm()}

            {/* Table Section */}
            <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                  {renderTableHeaders()}
                </TableHead>
                <TableBody>
                  {renderTableRows()}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDetailModal;