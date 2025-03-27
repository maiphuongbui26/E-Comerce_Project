import { Routes, Route } from 'react-router-dom';
import UserLayout from './page/users/UserLayout';
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

// Import other user pages as needed

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} /> 
        <Route path="/sale" element={<Sales />} /> 
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/shirts" element={<Shirts />} />
        <Route path="/pants" element={<Pants />} />
        <Route path="/skirts" element={<Skirts />} />
        <Route path="/jackets" element={<Jackets />} />
        <Route path="/blazer-ss-2025" element={<Blazer />} />
        <Route path="/product-details" element={<ProductDetail />} />
      </Route>
    </Routes>   
  );
}

export default App;
