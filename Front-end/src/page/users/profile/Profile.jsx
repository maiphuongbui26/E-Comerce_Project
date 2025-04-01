import { Box, Button, TextField, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Phương Mia",
    phone: "",
    email: "phuongmai18@gmail.com"
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new states
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Add handlers
  const handlePasswordModalOpen = () => setOpenPasswordModal(true);
  const handlePasswordModalClose = () => {
    setOpenPasswordModal(false);
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = () => {
    // Add your password change logic here
    console.log(passwordData);
    handlePasswordModalClose();
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "40px 20px" }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left Side - Profile Info */}
        <Box sx={{ flex: 1, bgcolor: "#fff", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Hồ sơ của tôi</Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80,
                mr: 2 
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>{profileData.name}</Typography>
              <Button 
              onClick={handlePasswordModalOpen}
                sx={{ 
                  color: "#dc0606", 
                  p: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "underline",
                  "&:hover": {
                    bgcolor: "transparent",
                    opacity: 0.8
                  }
                }}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography sx={{ mb: 1 }}>Tên</Typography>
              <TextField
                fullWidth
                name="name"
                value={profileData.name}
                onChange={handleChange}
                placeholder="Họ và tên"
                size="small"
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Số điện thoại</Typography>
              <TextField
                fullWidth
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Điện thoại"
                size="small"
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Email</Typography>
              <TextField
                fullWidth
                name="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Email"
                size="small"
              />
            </Box>
            <Button 
              variant="contained"
              sx={{ 
                width: "fit-content",
                bgcolor: "#303030",
                "&:hover": {
                  bgcolor: "#1a1a1a"
                }
              }}
            >
              LƯU
            </Button>
          </Box>
        </Box>
        {/* Right Side - Orders */}
        <Box sx={{ flex: 1, bgcolor: "#fff", p: 3, borderRadius: 1 }}>
            <Typography variant="h6">Đơn hàng của tôi</Typography>
            <Typography sx={{fontSize: "14px", color: "#666", mt: 2,fontWeight: 600, textAlign: 'center' }}>
            Tra cứu đơn hàng của tôi <a style={{color: "#D40404" }} href="/user/order">tại đây</a>
            </Typography>
        </Box>
      </Box>
      <Dialog 
      open={openPasswordModal} 
      onClose={handlePasswordModalClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid #e0e0e0',
        p: 2
      }}>
        Đổi mật khẩu
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: '14px', color: '#666', mb: 3 }}>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            name="oldPassword"
            label="Mật khẩu cũ"
            type="password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            size="small"
          />
          <TextField
            fullWidth
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            size="small"
          />
          <TextField
            fullWidth
            name="confirmPassword"
            label="Xác nhận Mật khẩu"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button 
          onClick={handlePasswordModalClose}
          sx={{ 
            color: '#666',
            '&:hover': { bgcolor: 'transparent', opacity: 0.8 }
          }}
        >
          HỦY
        </Button>
        <Button
          onClick={handlePasswordSubmit}
          variant="contained"
          sx={{
            bgcolor: '#303030',
            '&:hover': { bgcolor: '#1a1a1a' }
          }}
        >
          XÁC NHẬN
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default Profile;