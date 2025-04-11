import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthAdmin } from "../../hooks/useAuthAdmin";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const { getAdmin,admin } = useAuthAdmin();
  const menuItems = [
    {
      title: "Quản lý danh mục",
      path: "/admin/categories",
      icon: <CategoryIcon />,
    },
    {
      title: "Quản lý đơn hàng",
      path: "/admin/orders",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Quản lý sản phẩm",
      path: "/admin/products",
      icon: <InventoryIcon />,
    },
    {
      title: "Quản lý khuyến mãi",
      path: "/admin/promotions",
      icon: <LocalOfferIcon />,
    },
    {
      title: "Quản lý nhà cung cấp",
      path: "/admin/suppliers",
      icon: <BusinessIcon />,
    },
    {
      title: "Quản lý tài khoản",
      path: "/admin/users",
      icon: <PeopleIcon />,
    },
  ];


  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "#fff", // Changed from #1a1a1a
        height: "100vh",
        color: "#303030", // Changed text color for better visibility
        position: "fixed",
        left: 0,
        top: 0,
        borderRight: "1px solid #e0e0e0", // Added border for separation
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid ##303030",
          display: "flex",
          alignItems: "center",
          '& :hover': {
            cursor: 'pointer'
          },
        }}
        onClick={() => navigate("/admin")}
      >
        <img
          src="../../../public/image/logo_main.jpg"
          width={80}
          height={40}
          alt=""
        />
        <Typography
          variant="h6"
          sx={{
            marginLeft: "16px",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            letterSpacing: "1px",
            fontSize: "22px",
            background: "linear-gradient(45deg, #303030 30%, #666 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FDS Shop
        </Typography>
      </Box>

      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.5,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#303030", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "14px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavbarAdmin;
