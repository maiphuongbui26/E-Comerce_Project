import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthAdmin } from "../../hooks/useAuthAdmin";
import { categoryFormConfigs } from "../../constants/categoryFormConfigs";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const { getAdmin, admin } = useAuthAdmin();
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const isStaff = admin?.VaiTro === "nhanvien";

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };

  const handleCategoryItemClick = (category) => {
    navigate(`/admin/categories/${category.MaMuc}`, { 
      state: { category: {
        MaMuc: category.MaMuc,
        TenMuc: category.MaMuc,
        endpoint: category.endpoint
      } } 
    });
  };

  useEffect(() => {
    const categoryList = Object.keys(categoryFormConfigs).map(key => {
      const apiField = categoryFormConfigs[key].find(field => field.id === 'API');
      const displayNameField = categoryFormConfigs[key].find(field => field.id === 'DisplayName');
      return {
        MaMuc: key,
        TenMuc: displayNameField?.value || key.replace('C_', ''),
        endpoint: apiField?.endpoint || key.toLowerCase()
      };
    });
    setCategories(categoryList);
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
      staffAccess: true
    },
    {
      title: "Quản lý danh mục",
      path: "/admin/categories",
      icon: <CategoryIcon />,
      hasSubmenu: true,
      staffAccess: false
    },
    {
      title: "Quản lý đơn hàng",
      path: "/admin/orders",
      icon: <ShoppingCartIcon />,
      staffAccess: true
    },
    {
      title: "Quản lý sản phẩm",
      path: "/admin/products",
      icon: <InventoryIcon />,
      staffAccess: true
    },
    {
      title: "Quản lý khuyến mãi",
      path: "/admin/promotions",
      icon: <LocalOfferIcon />,
      staffAccess: false
    },
    {
      title: "Quản lý nhà cung cấp",
      path: "/admin/suppliers",
      icon: <BusinessIcon />,
      staffAccess: false
    },
    {
      title: "Quản lý kho hàng",
      path: "/admin/warehouses",
      icon: <WarehouseIcon />,
      staffAccess: true
    },
    {
      title: "Quản lý tài khoản",
      path: "/admin/users",
      icon: <PeopleIcon />,
      staffAccess: false
    },
  ];

  const filteredMenuItems = isStaff 
    ? menuItems.filter(item => item.staffAccess)
    : menuItems;

  return (
    <Box sx={{ width: 280, bgcolor: "#fff", height: "100vh", color: "#303030", position: "fixed", left: 0, top: 0, borderRight: "1px solid #e0e0e0" }}>
      <Box sx={{ p: 2, borderBottom: "1px solid ##303030", display: "flex", alignItems: "center", '& :hover': { cursor: 'pointer' }, }} onClick={() => navigate("/admin")}>
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
        {filteredMenuItems.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={item.hasSubmenu ? handleCategoryClick : () => navigate(item.path)}
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
                {item.hasSubmenu && (openCategory ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            
            {!isStaff && item.hasSubmenu && (
              <Collapse in={openCategory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categories.map((category, subIndex) => (
                    <ListItemButton
                      key={subIndex}
                      sx={{ pl: 4 }}
                      onClick={() => handleCategoryItemClick(category)}
                    >
                      <ListItemText 
                        primary={category.TenMuc} 
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontSize: "13px",
                          },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default NavbarAdmin;
