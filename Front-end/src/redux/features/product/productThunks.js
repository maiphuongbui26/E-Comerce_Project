import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit, filters }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      if (productData.HinhAnh) {
        productData.HinhAnh.forEach(file => {
          formData.append('HinhAnh', file);
        });
      }

      Object.keys(productData).forEach(key => {
        if (key !== 'HinhAnh') {
          formData.append(key, JSON.stringify(productData[key]));
        }
      });

      const response = await axios.post(`${BASE_URL}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      if (productData.HinhAnh) {
        productData.HinhAnh.forEach(file => {
          formData.append('HinhAnh', file);
        });
      }

      Object.keys(productData).forEach(key => {
        if (key !== 'HinhAnh') {
          formData.append(key, JSON.stringify(productData[key]));
        }
      });

      const response = await axios.put(`${BASE_URL}/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  'products/deleteProductImage',
  async ({ id, filename }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${id}/images/${filename}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'products/toggleFavorite',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/products/${id}/favorite`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);