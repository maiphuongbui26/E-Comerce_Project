import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NavbarAdmin from "../../component/header/NavbarAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useAuthAdmin } from "../../hooks/useAuthAdmin";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { admin, handleAdminLogout, getAdmin } = useAuthAdmin();

  useEffect(() => {
    getAdmin();
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = async () => {
    const res = await handleAdminLogout();
    if (res.status === 200) {
      navigate("/auth/admin/login");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavbarAdmin />
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: "280px" }}>
        {/* Header */}
        <Box
          sx={{
            height: "64px",
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 1,
              px: 2,
            }}
          ></Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <DarkModeOutlinedIcon />
            </IconButton>
            <IconButton>
              <FullscreenExitOutlinedIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleClick}>
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                sx: {
                  width: 200,
                  bgcolor: "#fff",
                  "& .MuiMenuItem-root": {
                    py: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* User Info */}
              <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #eee" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {admin?.HoVaTen}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "13px" }}
                >
                  {admin?.ThuDienTu}
                </Typography>
              </Box>

              <MenuItem sx={{ bgcolor: "#f3f0ff", mt: 1 }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cài đặt tài khoản</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ cá nhân" />
                <Box
                  sx={{
                    bgcolor: "#fff3dc",
                    color: "#ffb74d",
                    px: 1,
                    borderRadius: 1,
                    fontSize: "12px",
                  }}
                >
                  02
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Đăng xuất</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "calc(100vh - 64px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
