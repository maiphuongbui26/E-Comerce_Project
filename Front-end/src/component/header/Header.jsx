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
import CloseIcon from "@mui/icons-material/Close";
import { Drawer } from "@mui/material";

const menuItems = [
  { label: "GIẢM GIÁ", path: "/sales" },
  { label: "ĐẦM", path: "/dresses" },
  { label: "ÁO", path: "/shirts" },
  { label: "QUẦN", path: "/pants" },
  { label: "CHÂN VÁY", path: "/skirts" },
  { label: "ÁO KHOÁC", path: "/jackets" },
  { label: "LOOKBOOK", path: "/lookbook" },
  { label: "BLAZER SS 2025", path: "/blazer-ss-2025" },
];
const settings = ["Tài khoản của tôi", "Đăng xuất"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleMenuClick = (path) => {
    handleCloseNavMenu();
    navigate(path);
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

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", color: "#000", padding: "12px" }}
    >
      <Container sx={{ maxWidth: "1240px" }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img
              src="../../../public/image/20240805_KnfT1Dl0.png"
              width={77}
              height={44}
            />
          </Box>
          {/* Menu app */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                {menuItems.map((page, index) => (
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
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            <img
              src="../../../public/image/20240805_KnfT1Dl0.png"
              width={77}
              height={44}
            />
          </Typography>
          {/* UI PC */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {menuItems.map((page, index) => (
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
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ color: "#000", p: 0 }}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#000", p: 0 }}
            >
              <LocalMallOutlinedIcon sx={{ margin: "0 10px" }} />
            </IconButton>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ color: "#000", p: 0 }}
            >
              <PersonOutlineOutlinedIcon />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
