import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
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
          bgcolor: 'rgba(255, 255, 255, 0.8)', // Make the background semi-transparent
          borderRadius: 2,
          p: 4,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          mx: 'auto'
        }}>
          <Typography sx={{fontSize: "20px", fontWeight: 600, mb: 3, color: '#333'}}>
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Nhập SDT hoặc Địa chỉ email:
            </Typography>
            <TextField
              fullWidth
              placeholder="Email hoặc tên đăng nhập"
              name="username"
              value={credentials.username}
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
              name="password"
              type="password"
              value={credentials.password}
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
  );
};

export default Login;
