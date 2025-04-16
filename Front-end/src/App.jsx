import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./page/users/UserLayout";
import AdminLayout from "./page/admin/AdminLayout";
import AddPromotion from "./page/admin/promotion_management/AddPromotion";
import EditPromotion from "./page/admin/promotion_management/EditPromotion";
import AddSupplier from "./page/admin/supplier_management/AddSupplier";
import EditSupplier from "./page/admin/supplier_management/EditSupplier";
import Home from "./page/users/home/Home";
import Cart from "./page/users/cart/Cart";
import Dresses from "./page/users/product_bak/Dresses";
import Shirts from "./page/users/product_bak/shirts";
import Pants from "./page/users/product_bak/Pants";
import Skirts from "./page/users/product_bak/Skirts";
import Jackets from "./page/users/product_bak/Jackets";
import ProductDetail from "./page/users/product_details/ProductDetail";
import Profile from "./page/users/profile/Profile";
import Order from "./page/users/order/Order";
import CategoryManagement from "./page/admin/categories_management/CategoryManagement";
import OrderManagement from "./page/admin/order_management/OrderManagement";
import ProductManagement from "./page/admin/product_management/ProductManagement";
import PromotionManagement from "./page/admin/promotion_management/PromotionManagement";
import SupplierManagement from "./page/admin/supplier_management/SupplierManagement";
import UserManagement from "./page/admin/user_management/UserManagement";
import AddProduct from "./page/admin/product_management/AddProduct";
import EditProduct from "./page/admin/product_management/EditProduct";
import Login from "./page/users/auth_user/Login";
import Register from "./page/users/auth_user/Register";
import AddUser from "./page/admin/user_management/AddUser";
import EditUser from "./page/admin/user_management/EditUser";
import LoginAdmin from "./page/admin/auth_admin/LoginAdmin";
import CategoryDetail from "./page/admin/categories_management/CategoryDetail";
import Dashboard from "./page/admin/DashBoard/DashBoard";
import TShirts from "./page/users/product/casual-wear/t-shirts/t-shirts";
import Shorts from "./page/users/product/casual-wear/shorts/shorts";
import Blazers from "./page/users/product/office-wear/blazers/blazers";
import OfficeDresses from "./page/users/product/office-wear/dresses/dresses";
import OfficeShirts from "./page/users/product/office-wear/shirts/shirts";
import OfficeSkirts from "./page/users/product/office-wear/skirts/skirts";
import PartyDresses from "./page/users/product/party-wear/dresses/dresses";
import EveningGowns from "./page/users/product/party-wear/gowns/gowns";
import BabydollDresses from "./page/users/product/spring-summer/babydoll/babydoll";
import FloralDresses from "./page/users/product/spring-summer/floral/floral";
import MaxiDresses from "./page/users/product/spring-summer/maxi/maxi";
import StrapDresses from "./page/users/product/spring-summer/strap-dresses/strap-dresses";
import Bags from "./page/users/product/accessories/bags/bags";
import Glasses from "./page/users/product/accessories/glasses/glasses";
import Hats from "./page/users/product/accessories/hats/hats";
import Jewelry from "./page/users/product/accessories/jewelry/jewelry";
import Sales from "./page/users/product/sale/Sale";

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
        <Route path="sale" element={<Sales />} />
        <Route index element={<Home />} /> {/* Use index route for home */}
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Profile />} />
        <Route path="order" element={<Order />} />
        <Route path="product/:id" element={<ProductDetail />} /> 
        <Route path="casual-wear">
          <Route path="t-shirts" element={<TShirts />} />
          <Route path="shorts" element={<Shorts />} />
        </Route>
        <Route path="office-wear">
          <Route path="blazers" element={<Blazers />} />
          <Route path="dresses" element={<OfficeDresses />} />
          <Route path="shirts" element={<OfficeShirts />} />
          <Route path="skirts" element={<OfficeSkirts />} />
        </Route>
        <Route path="party-wear">
          <Route path="dresses" element={<PartyDresses />} />
          <Route path="gowns" element={<EveningGowns />} />
        </Route>
        <Route path="spring-summer">
          <Route path="babydoll" element={<BabydollDresses />} />
          <Route path="floral" element={<FloralDresses />} />
          <Route path="maxi" element={<MaxiDresses />} />
          <Route path="strap-dresses" element={<StrapDresses />} />
        </Route>
        <Route path="accessories">
          <Route path="bags" element={<Bags />} />
          <Route path="glasses" element={<Glasses />} />
          <Route path="hats" element={<Hats />} />
          <Route path="jewelry" element={<Jewelry />} />
        </Route>
      </Route>

      {/* Auth Routes User */}
      <Route path="/auth/admin">
        <Route path="login" element={<LoginAdmin />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="categories" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="categories/:id" element={<CategoryDetail />} />
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
