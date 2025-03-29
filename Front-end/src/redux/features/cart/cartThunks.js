import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart/${userId}/items`, {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/cart/${userId}/items/${productId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${userId}/items/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${userId}`);
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);