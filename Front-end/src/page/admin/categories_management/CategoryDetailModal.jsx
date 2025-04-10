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
        { id: 'idNhaCungCap', label: 'Mã nhà cung cấp', field: 'idNhaCungCap' },
        { id: 'TenNhaCungCap', label: 'Tên nhà cung cấp', field: 'TenNhaCungCap' },
        { id: 'Email', label: 'Thư điện tử', field: 'Email' },
        { id: 'SoDienThoai', label: 'Số điện thoại', field: 'SoDienThoai' },
        { id: 'DiaChi', label: 'Địa chỉ', field: 'DiaChi' },
        { id: 'MoTa', label: 'Mô tả', field: 'MoTa' },
        { id: 'SanPhamCungCap', label: 'Sản phẩm cung cấp', field: 'SanPhamCungCap' },
      ],
      C_DanhMucSanPham: [
        { id: 'idDanhMuc', label: 'Mã danh mục', field: 'idDanhMuc' },
        { id: 'TenDanhMuc', label: 'Tên danh mục', field: 'TenDanhMuc' },
        { id: 'MoTa', label: 'Mô tả', field: 'MoTa' },
        { id: 'HinhAnh', label: 'Hình ảnh', field: 'HinhAnh', type: 'file' },
      ],
      C_KichThuoc: [
        { id: 'id', label: 'Mã kích thước', field: 'id' },
        { id: 'size', label: 'Kích thước', field: 'size' },
        { id: 'description', label: 'Mô tả', field: 'description' }
      ],
      C_BoLocSapXep: [
        { id: 'id', label: 'Mã bộ lọc sắp xếp', field: 'id' },
        { id: 'ThuTuSapXep', label: 'Thứ tự sắp xếp', field: 'ThuTuSapXep' }
      ],
      C_LoaiSanPham: [
        { id: 'id', label: 'Mã loại sản phẩm', field: 'id' },
        { id: 'TenLoaiSanPham', label: 'Tên loại sản phẩm', field: 'TenLoaiSanPham' }
      ],
      C_DonGia: [
        { id: 'id', label: 'Mã đơn giá', field: 'id' },
        { id: 'TenDonGia', label: 'Tên đơn giá', field: 'TenDonGia' }
      ],
      C_Style: [
        { id: 'id', label: 'Mã', field: 'id' },
        { id: 'TenStyle', label: 'Tên', field: 'TenStyle' },
        { id: 'HinhAnh', label: 'Ảnh minh họa cho collection', field: 'HinhAnh', type: 'file' }
      ]
    };
  
    const getFormTitle = (categoryType) => {
      const titles = {
        C_NhaCungCap: 'nhà cung cấp',
        C_DanhMucSanPham: 'sản phẩm',
        C_KichThuoc: 'kích thước',
        C_BoLocSapXep: 'bộ lọc sắp xếp',
        C_LoaiSanPham: 'loại sản phẩm',
        C_DonGia: 'đơn giá',
        C_Style: 'style'
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
                label={field.type !== 'file' ? field.label : ""}
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
      { 
        id: "NCC001", 
        idNhaCungCap: "NCC001",
        TenNhaCungCap: "Công ty TNHH ABC",
        Email: "abc@company.com",
        SoDienThoai: "0123456789",
        DiaChi: "123 Nguyễn Văn A, Q.1, TP.HCM",
        MoTa: "Nhà cung cấp quần áo nam nữ",
        SanPhamCungCap: "Quần áo thời trang",
        TrangThai: true,
      },
      { 
        id: "NCC002",
        idNhaCungCap: "NCC002",
        TenNhaCungCap: "Công ty CP XYZ",
        Email: "xyz@company.com",
        SoDienThoai: "0987654321",
        DiaChi: "456 Lê Văn B, Q.2, TP.HCM",
        MoTa: "Nhà cung cấp phụ kiện thời trang",
        SanPhamCungCap: "Phụ kiện thời trang",
        TrangThai: true,
      }
    ],
    C_DanhMucSanPham: [
      {
        id: "DM001",
        idDanhMuc: "DM001",
        TenDanhMuc: "Áo thun nam",
        MoTa: "Các loại áo thun dành cho nam",
        HinhAnh: "https://example.com/images/ao-thun-nam.jpg",
        TrangThai: true,
      },
      {
        id: "DM002",
        idDanhMuc: "DM002",
        TenDanhMuc: "Quần jean nữ",
        MoTa: "Các loại quần jean dành cho nữ",
        HinhAnh: "https://example.com/images/quan-jean-nu.jpg",
        TrangThai: true,
      }
    ],
    C_KichThuoc: [
      {
        id: "KT001",
        size: "S",
        description: "Small - 35-36kg"
      },
      {
        id: "KT002",
        size: "M",
        description: "Medium - 37-45kg"
      }
    ],
    C_BoLocSapXep: [
      {
        id: "BL001",
        ThuTuSapXep: "Giá tăng dần"
      },
      {
        id: "BL002",
        ThuTuSapXep: "Giá giảm dần"
      }
    ],
    C_LoaiSanPham: [
      {
        id: "LSP001",
        TenLoaiSanPham: "Áo thun"
      },
      {
        id: "LSP002",
        TenLoaiSanPham: "Quần jean"
      }
    ],
    C_DonGia: [
      {
        id: "DG001",
        TenDonGia: "Giá bán lẻ"
      },
      {
        id: "DG002",
        TenDonGia: "Giá bán sỉ"
      }
    ],
    C_Style: [
      {
        id: "ST001",
        TenStyle: "Casual",
        HinhAnh: "https://example.com/images/casual-style.jpg"
      },
      {
        id: "ST002",
        TenStyle: "Formal",
        HinhAnh: "https://example.com/images/formal-style.jpg"
      }
    ]
  };

  const renderTableHeaders = () => {
    switch(category?.TenMuc) {
      case 'C_NhaCungCap':
        return (
          <TableRow>
            <TableCell align="center">Mã NCC</TableCell>
            <TableCell align="center">Tên nhà cung cấp</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Địa chỉ</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
            <TableCell align="center">Sản phẩm</TableCell>
            <TableCell align="center">Mô Tả</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        );
      case 'C_DanhMucSanPham':
        return (
          <TableRow>
            <TableCell align="center">Mã SP</TableCell>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Danh mục</TableCell>
            <TableCell align="center">Hình ảnh</TableCell>
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
      case 'C_BoLocSapXep':
        return (
          <TableRow>
            <TableCell align="center">Mã BLSX</TableCell>
            <TableCell align="center">Thứ tự sắp xếp</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        );
      case 'C_LoaiSanPham':
        return (
          <TableRow>
             <TableCell align="center">Mã Loại SP</TableCell>
            <TableCell align="center">Tên Loại SP</TableCell>
            <TableCell align="center">Thao tác</TableCell> 
          </TableRow>
        );
      case 'C_DonGia':
        return (
          <TableRow>
            <TableCell align="center">Mã Đơn Giá</TableCell>
            <TableCell align="center">Tên Đơn Giá</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        );
      case 'C_Style':
        return (
          <TableRow>
            <TableCell align="center">Mã Style</TableCell>
            <TableCell align="center">Tên Style</TableCell>
            <TableCell align="center">Ảnh minh họa</TableCell>  
            </TableRow>
        )
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
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.idNhaCungCap}</TableCell>
              <TableCell align="center">{item.TenNhaCungCap}</TableCell>
              <TableCell align="center">{item.Email}</TableCell>
              <TableCell align="center">{item.DiaChi}</TableCell>
              <TableCell align="center">{item.SoDienThoai}</TableCell>
              <TableCell align="center">{item.SanPhamCungCap}</TableCell>
              <TableCell align="center">{item.MoTa}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.idDanhMuc}</TableCell>
              <TableCell align="center">{item.TenDanhMuc}</TableCell>
              <TableCell align="center">{item.MoTa}</TableCell>
              <TableCell align="center">
                {item.HinhAnh && (
                  <Box
                    component="img"
                    src={item.HinhAnh}
                    alt={item.TenDanhMuc}
                    sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.size}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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
        case 'C_BoLocSapXep':
          return (
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.ThuTuSapXep}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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
        case 'C_LoaiSanPham':
          return (
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.TenLoaiSanPham}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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
        case 'C_DonGia':
          return (
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.TenDonGia}</TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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
        case 'C_Style':
          return (
            <TableRow key={item.id} hover>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.TenStyle}</TableCell>
              <TableCell align="center">
                {item.HinhAnh && (
                  <Box
                    component="img"
                    src={item.HinhAnh}
                    alt={item.TenStyle}
                    sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Sửa">
                  <IconButton size="small" onClick={() => {
                    setEditingId(item.id);
                    setFormData(item);
                  }}>
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