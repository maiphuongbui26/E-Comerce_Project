import { Routes, Route } from 'react-router-dom';
import UserLayout from './page/users/UserLayout';
import Home from './page/users/home/Home';
import Cart from './page/users/cart/Cart';
import Checkout from './page/users/checkout/Checkout';
// Import other user pages as needed

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} /> 
        <Route path="dresses" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>   
  );
}

export default App;
