import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAuthAdmin } from '../../../hooks/useAuthAdmin';

// Styled components
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#000',
  },
});

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ThuDienTu: '',
    MatKhau: ''
  });
  const {handleAdminLogin, admin, error, isAuthenticated, isLoading} = useAuthAdmin();
  const [authError, setAuthError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await handleAdminLogin(formData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    console.log(error);
    if (admin?.user?.VaiTro === 'khachhang') {
      setAuthError('Tài khoản không có quyền truy cập vào trang quản trị');
      localStorage.removeItem('adminToken');
      return;
    }
    setAuthError(null);
    if (isAuthenticated && admin?.user?.VaiTro === 'admin') {
      navigate('/admin/categories');
    }
  }, [isAuthenticated, admin]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#fff' }}>
      {/* Left side - Logo */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Bailey and Co."
          sx={{
            width: '300px',
            height: 'auto'
          }}
        />
      </Box>

      {/* Right side - Login form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 6,
          borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          <Typography variant="h3" sx={{ mb: 4, color: 'rgba(0, 0, 0, 0.7)' }}>
            Welcome
          </Typography>
          
          {/* Add error alert */}
          {(authError || error) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {authError || error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="ThuDienTu"
              value={formData.ThuDienTu}
              onChange={(e) => setFormData({ ...formData, ThuDienTu: e.target.value })}
            />
            <StyledTextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              name="MatKhau"
              value={formData.MatKhau}
              onChange={(e) => setFormData({ ...formData, MatKhau: e.target.value })}
            />

            <Button
            onClick={handleSubmit}
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: '#303030',
                '&:hover': {
                  bgcolor: '#404040'
                }
              }}
            >
              Đăng nhập
            </Button>

            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.7)',
                cursor: 'pointer',
                '&:hover': {
                  color: '#303030'
                }
              }}
            >
              Quên mật khẩu?
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAdmin;
