

import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton, 
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { categoryFormConfigs } from '../../../constants/categoryFormConfigs';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryDetailModal = ({ open, onClose, category, onUpdate }) => {
  // Add new state for items
  const [items, setItems] = useState([]);
  
  // States
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formFields = category ? categoryFormConfigs[category.TenMuc] : [];

  // Add handleInputChange function
  const handleInputChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };
  // Handlers
  const handleAdd = () => {
    setIsAdding(true);
    setFormData({});
  };

  const handleEdit = (item) => {
    setIsAdding(false);
    setEditingId(item.id);
    
    // Map the item data directly to formData
    const editData = {};
    formFields.forEach(field => {
      if (!field.hidden) {
        // For C_DanhMucSanPham, map id to id if needed
        if (field.field === 'id' && !item[field.field]) {
          editData[field.field] = item.id;
        } else {
          editData[field.field] = item[field.field];
        }
      }
    });
    
    console.log('Form data for editing:', editData);
    setFormData(editData);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
    setError(null);
  };

  // Fetch items when category changes
  useEffect(() => {
    if (category) {
      fetchItems();
    }
  }, [category]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://localhost:8080/api/${category.endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setItems(response.data[`${category.endpoint}`]);
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (isAdding) {
        await axios.post(
          `http://localhost:8080/api/${category.endpoint}/create`,
          formData,
          config
        );
      } else {
        await axios.put(
          `http://localhost:8080/api/${category.endpoint}/update/${editingId}`,
          formData,
          config
        );
      }
      
      fetchItems();
      handleCancel();
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:8080/api/${category.endpoint}/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      fetchItems();
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa');
    } finally {
      setLoading(false);
    }
  };

  // Update TableBody to render actual data
  // Filter out hidden fields for the table headers
  const visibleFields = formFields.filter(field => !field.hidden);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {category ? `Chi tiết danh mục: ${category.TenMuc}` : 'Chi tiết danh mục'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAdd}
            disabled={isAdding || loading}
          >
            Thêm mới
          </Button>
        </Box>

        {/* Form for Add/Edit */}
        {(isAdding || editingId) && (
          <Box component="form" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {isAdding ? 'Thêm mới' : 'Chỉnh sửa'}
            </Typography>
            
            {formFields.filter(item => !item.hidden).map((field, index) => (
              field.type === 'file' ? (
                // Special handling for file input
                <TextField
                  key={index}
                  fullWidth
                  label={field.field !== 'HinhAnh' ? field.label : ''}
                  type="file"
                  onChange={(e) => handleInputChange(field.field, e.target.files[0])}
                  required={field.required}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
              ) : (
                // Normal text input
                <TextField
                  key={index}
                  fullWidth
                  label={field.field !== 'HinhAnh' ? field.label : ''}
                  value={formData[field.field] || ''}
                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                  required={field.required}
                  type={field.type || 'text'}
                  multiline={field.multiline}
                  rows={field.multiline ? 4 : 1}
                  error={error && !formData[field.field] && field.required}
                  helperText={error && !formData[field.field] && field.required ? 'Trường này là bắt buộc' : ''}
                  sx={{ mb: 2 }}
                />
              )
            ))}

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </Box>
          </Box>
        )}

        {/* Data Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                {visibleFields.map((field, index) => (
                  <TableCell key={index}>{field.label}</TableCell>
                ))}
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={visibleFields.length + 1} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : items?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleFields.length + 1} align="center">
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                items?.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    {visibleFields.map((field, fieldIndex) => (
                      <TableCell key={`${itemIndex}-${fieldIndex}`}>
                        {field.type === 'file' ? (
                          item[field.field] ? 'Đã tải lên' : 'Chưa có file'
                        ) : (
                          item[field.field]
                        )}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(item)}
                        disabled={isAdding || loading}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {error && !error.includes('bắt buộc') && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDetailModal;