
import { Box, Typography, Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Order = () => {
  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "40px 20px" }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left side - Orders */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 600, mb: 3 }}>
            ĐƠN HÀNG
          </Typography>
          
          <Typography sx={{ color: "#666", mb: 4 }}>
            Chưa có đơn hàng nào
          </Typography>
        </Box>

        {/* Right side - Account Info */}
        <Box sx={{ flex: 1, bgcolor: "#fff", p: 3, borderRadius: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tài khoản của tôi
            </Typography>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>
              Tên tài khoản: Cường Nguyễn !
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ApartmentIcon sx={{ color: "#666" }} />
              <Typography>Thành phố:</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ color: "#666" }} />
              <Typography>Quận:</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeIcon sx={{ color: "#666" }} />
              <Typography>Địa chỉ:</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "#666" }} />
              <Typography>Điện thoại:</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "#666" }} />
              <Typography>Email: cuonghc2k2abc@gmail.com</Typography>
            </Box>

            <Button 
              variant="contained"
              sx={{ 
                width: "fit-content",
                mt: 2,
                bgcolor: "#303030",
                "&:hover": {
                  bgcolor: "#1a1a1a"
                }
              }}
            >
              Sửa
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
  