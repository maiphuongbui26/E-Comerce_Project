import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./page/users/UserLayout";
// Add admin layout import
import AdminLayout from "./page/admin/AdminLayout";
import AddPromotion from "./page/admin/promotion_management/AddPromotion";
import EditPromotion from "./page/admin/promotion_management/EditPromotion";
import AddSupplier from "./page/admin/supplier_management/AddSupplier";
import EditSupplier from "./page/admin/supplier_management/EditSupplier";
import Home from "./page/users/home/Home";
import Cart from "./page/users/cart/Cart";
import Sales from "./page/users/product/Sale";
import Dresses from "./page/users/product/Dresses";
import Shirts from "./page/users/product/shirts";
import Pants from "./page/users/product/Pants";
import Skirts from "./page/users/product/Skirts";
import Jackets from "./page/users/product/Jackets";
import Blazer from "./page/users/product/Blazer";
import ProductDetail from "./page/users/product_details/ProductDetail";
import Profile from "./page/users/profile/Profile";
import Order from "./page/users/order/Order";
import CategoryManagement from "./page/admin/categories_management/CategoryManagement";
import OrderManagement from "./page/admin/order_management/OrderManagement";
import ProductManagement from "./page/admin/product_management/ProductManagement";
import PromotionManagement from "./page/admin/promotion_management/PromotionManagement";
import SupplierManagement from "./page/admin/supplier_management/SupplierManagement";
import UserManagement from "./page/admin/user_management/UserManagement";
import AddCategory from "./page/admin/categories_management/AddCategory";
import EditCategory from "./page/admin/categories_management/EditCategory";
import AddProduct from "./page/admin/product_management/AddProduct";
import EditProduct from "./page/admin/product_management/EditProduct";
import Login from "./page/users/auth_user/Login";
import Register from "./page/users/auth_user/Register";
import AddUser from "./page/admin/user_management/AddUser";
import EditUser from "./page/admin/user_management/EditUser";
import LoginAdmin from "./page/admin/auth_admin/LoginAdmin";

function App() {
  return (
    <Routes>
      {/* Auth Routes User */}
      <Route path="/auth/user">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="/user" element={<Home />} />
        <Route path="sale" element={<Sales />} />
        <Route path="dresses" element={<Dresses />} />
        <Route path="shirts" element={<Shirts />} />
        <Route path="pants" element={<Pants />} />
        <Route path="skirts" element={<Skirts />} />
        <Route path="jackets" element={<Jackets />} />
        <Route path="blazer-ss-2025" element={<Blazer />} />
        <Route path="product-details" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Profile />} />
        <Route path="order" element={<Order />} />
      </Route>

      {/* Auth Routes User */}
      <Route path="/auth/admin">
        <Route path="login" element={<LoginAdmin />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="promotions" element={<PromotionManagement />} />
        <Route path="promotions/add" element={<AddPromotion />} />
        <Route path="promotions/edit/:id" element={<EditPromotion />} />
        <Route path="suppliers" element={<SupplierManagement />} />
        <Route path="suppliers/add" element={<AddSupplier />} />
        <Route path="suppliers/edit/:id" element={<EditSupplier />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/edit/:id" element={<EditUser />} />
      </Route>
      {/* Redirect from root to user home */}
      <Route path="/" element={<Navigate to="/user" replace />} />
    </Routes>
  );
}

export default App;
