import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Popper, Paper, Fade } from "@mui/material";

const menuItems = [
  { label: "Trang chủ", path: "/user", hidden: true },
  { label: "GIẢM GIÁ", path: "/user/sale" },
  { label: "ĐẦM", path: "/user/dresses" },
  { label: "ÁO", path: "/user/shirts" },
  { label: "QUẦN", path: "/user/pants" },
  { label: "CHÂN VÁY", path: "/user/skirts" },
  { label: "ÁO KHOÁC", path: "/user/jackets" },
  { label: "BLAZER SS 2025", path: "/user/blazer-ss-2025" },
];
const settings = [
  {
    label: "Tài khoản của tôi",
    path: "/user/account",
  },
  {
    label: "Đăng xuất",
    path: "/login", 
  }
];

// Update the home navigation in the logo click handler



const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null); // State for cart dropdown
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleMenuClick = (path) => {
    handleCloseNavMenu();
    navigate(path === "/" ? "/user" : path);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCartOpen = (event) => {
    setAnchorElCart(anchorElCart ? null : event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorElCart(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Container sx={{ maxWidth: "1240px", px: "12px" }}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "block" }, mr: 1,":hover":{cursor:"pointer"}}}
            onClick={() => {
              handleMenuClick("/");
            }}
          >
            <img
              src="../../../public/image/logo_main.jpg"
              width={77}
              height={44}
            />
          </Box>
          {/* Menu app */}
          <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                p: 0,
                
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Box
                sx={{
                  width: "350px",
                  display: "flex",
                  flexDirection: "column",
                  mt: 2,
                }}
              >
                <IconButton
                  onClick={handleCloseNavMenu}
                  sx={{ alignSelf: "flex-end", mb: 1 }}
                >
                  <CloseIcon />
                </IconButton>
                {menuItems
                  .filter((item) => !item.hidden)
                  .map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleMenuClick(page.path)}
                    >
                      <Typography
                        sx={{
                          color: "#000",
                          whiteSpace: "nowrap",
                          fontSize: "14px !important",
                          fontWeight: 700,
                          marginLeft: "16px",
                        }}
                      >
                        {page.label}
                      </Typography>
                    </MenuItem>
                  ))}
              </Box>
            </Drawer>
          </Box>
          {/* UI PC */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {
              handleMenuClick("/");
            }}
            sx={{
              display: { xs: "block", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              marginLeft: "52px",
              letterSpacing: ".3rem",
              textDecoration: "none",
              hover: {
                cursor: "pointer",
              },
            }}
          >
            <img
              src="../../../public/image/20240805_KnfT1Dl0.png"
              width={61}
              height={38}
            />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {menuItems
              .filter((item) => !item.hidden)
              .map((page, index) => (
                <Button
                  key={index}
                  onClick={() => handleMenuClick(page.path)}
                  sx={{
                    my: 2,
                    color: "#000",
                    display: "block",
                    whiteSpace: "nowrap", // Prevent text wrapping
                    fontSize: "0.875rem", // Adjust font size for better fit
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#000",
                      whiteSpace: "nowrap",
                      fontSize: "14px !important",
                      fontWeight: 700,
                      px: 1,
                    }}
                  >
                    {page.label}
                  </Typography>
                </Button>
              ))}
          </Box>
          {/* Setting */}
          <Box sx={{ flexGrow: 0 }}>
            {/* Favorite */}
            <IconButton sx={{ color: "#000", p: 0 }} onClick={() => handleMenuClick('/user/favorite')}>
              <FavoriteBorderOutlinedIcon />
            </IconButton>
            {/* Cart */}
            <IconButton 
              sx={{ color: "#000", p: 0 }} 
              onClick={handleCartOpen}
            >
              <LocalMallOutlinedIcon sx={{ margin: "0 10px" }} />
            </IconButton>
            {/* Personal */}
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ display: { xs: "none", md: "inline-flex" }, color: "#000", p: 0 }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
            {/* Search */}
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#000", p: 0 }}
            >
              <SearchIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={() => handleMenuClick(setting.path)}
                    sx={{
                      textAlign: "center",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

      {/* Cart Dropdown */}
      <Popper
        open={Boolean(anchorElCart)}
        anchorEl={anchorElCart}
        transition
        placement="bottom-end"
        sx={{ zIndex: 1301 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                width: { xs: '90vw', sm: 400 },
                mt: 1,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton size="small" onClick={handleCartClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ 
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 300
              }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 50, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" mb={2}>
                  Giỏ hàng trống
                </Typography>
                <Button 
                  variant="contained"
                  onClick={() => {
                    handleCartClose();
                    handleMenuClick('/user/cart');
                  }}
                  sx={{
                    bgcolor: '#cc0f0f',
                    color: 'white',
                    px: 4,
                    py: 1,
                    '&:hover': {
                      bgcolor: '#a30c0c'
                    }
                  }}
                >
                  ĐẾN GIỎ HÀNG
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default Header;
