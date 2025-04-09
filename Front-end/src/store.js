import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/features/auth/authSlice';
import authAdminReducer from './redux/features/auth/adminAuthSlice';
import productReducer from './redux/features/product/productSlice';
import cartReducer from './redux/features/cart/cartSlice';
import categoryReducer from './redux/features/category/categorySlice';
import orderReducer from './redux/features/order/orderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    authAdmin: authAdminReducer,
    products: productReducer,
    cart: cartReducer,
    categories: categoryReducer,
    orders: orderReducer,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   devTools: process.env.NODE_ENV !== 'production',
});

export default store;