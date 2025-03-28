import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './page/users/UserLayout';
// Add admin layout import
import AdminLayout from './page/admin/AdminLayout';

import Home from './page/users/home/Home';
import Cart from './page/users/cart/Cart';
import Checkout from './page/users/checkout/Checkout';
import Sales from './page/users/product/Sale';
import Dresses from './page/users/product/Dresses';
import Shirts from './page/users/product/shirts';
import Pants from './page/users/product/Pants';
import Skirts from './page/users/product/Skirts';
import Jackets from './page/users/product/Jackets';
import Blazer from './page/users/product/Blazer';
import ProductDetail from './page/users/product_details/ProductDetail';
import Profile from './page/users/profile/Profile';
import Order from './page/users/order/Order';
import CategoryManagement from './page/admin/categories_management/CategoryManagement';
import OrderManagement from './page/admin/order_management/OrderManagement';
import ProductManagement from './page/admin/product_management/ProductManagement';
import PromotionManagement from './page/admin/promotion_management/PromotionManagement';
import SupplierManagement from './page/admin/supplier_management/SupplierManagement';
import UserManagement from './page/admin/user_management/UserManagement';
import AddCategory from './page/admin/categories_management/AddCategory';
import EditCategory from './page/admin/categories_management/EditCategory';

// Import other user pages as needed

function App() {
  return (
    <Routes>
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

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="promotions" element={<PromotionManagement />} />
        <Route path="suppliers" element={<SupplierManagement />} />
        <Route path="users" element={<UserManagement />} />

      </Route>
      {/* Redirect from root to user home */}
      <Route path="/" element={<Navigate to="/user" replace />} />
    </Routes>   
  );
}

export default App;
