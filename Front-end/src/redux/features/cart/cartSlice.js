import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from './cartThunks';

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const item = state.items.find(item => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Actions
export const { clearError, calculateTotals } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;