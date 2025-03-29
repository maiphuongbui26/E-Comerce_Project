import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateStock',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/products/${productId}/stock`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);