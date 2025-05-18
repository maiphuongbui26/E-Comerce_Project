import { Box, TextField, Button, Typography, Grid, Backdrop } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';

const Login = () => {
  const { handleLogin, error, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [credentials, setCredentials] = useState({
    ThuDienTu: '',
    MatKhau: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(credentials);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Lấy URL trước đó từ state, nếu không có thì về trang chủ
      const previousPath = location.state?.from || '/user';
      navigate(previousPath);
    }
  }, [isAuthenticated, location.state, navigate]);

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>

      <Grid container sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f5f5f5',
        backgroundImage: 'url("../../../../public/image/login_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Grid item xs={6} />

        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            p: 4,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            mx: 'auto'
          }}>
            <Typography sx={{fontSize: "20px", fontWeight: 600, mb: 3, color: '#333'}}>
              Đăng nhập
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error.message || error} {/* Sửa chỗ này */}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ color: '#555' }}>
                Nhập SDT hoặc Địa chỉ email:
              </Typography>
              <TextField
                fullWidth
                placeholder="Email hoặc tên đăng nhập"
                name="ThuDienTu"
                value={credentials.ThuDienTu}
                onChange={handleChange}
                margin="normal"
                sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
              />

              <Typography variant="body1" sx={{ color: '#555' }}>
                Mật Khẩu:
              </Typography>
              <TextField
                fullWidth
                placeholder="Password"
                name="MatKhau"
                type="password"
                value={credentials.MatKhau}
                onChange={handleChange}
                margin="normal"
                sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
              />

              <Link
                to="/forgot-password"
                style={{ 
                  color: '#0066cc',
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'block',
                  textAlign: 'right',
                  marginBottom: '16px'
                }}
              >
                Quên mật khẩu?
              </Link>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#333',
                  color: 'white',
                  py: 1.5,
                  mb: 2,
                  '&:hover': {
                    bgcolor: '#555'
                  }
                }}
              >
                ĐĂNG NHẬP
              </Button>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mb: 2 
              }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Chưa có tài khoản? 
                </Typography>
                <Link
                  to="/auth/user/register"
                  style={{ 
                    color: '#0066cc',
                    textDecoration: 'none',
                    marginLeft: '8px',
                    fontWeight: 500
                  }}
                >
                  Đăng ký ngay
                </Link>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ mb: 1, color: '#333', borderColor: '#ccc' }}
              >
                Đăng nhập gmail
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                sx={{ color: '#333', borderColor: '#ccc' }}
              >
                Đăng nhập facebook
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
