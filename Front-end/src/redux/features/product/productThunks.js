import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${BASE_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: filters // Add filters to query params
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
      const token = localStorage.getItem('adminToken');
      
      // Convert and optimize files to base64
      let imageBase64Array = [];
      if (productData.HinhAnh && productData.HinhAnh.length > 0) {
        imageBase64Array = await Promise.all(
          productData.HinhAnh.map(file => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              const img = new Image();
              
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set maximum dimensions
                const maxWidth = 1024;
                const maxHeight = 1024;
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                  if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                  }
                } else {
                  if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress with 70% quality
              };

              img.onerror = reject;
              
              reader.onload = (e) => {
                img.src = e.target.result;
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );
      }

      // Prepare the data object
      const requestData = {
        ...productData,
        HinhAnh: imageBase64Array
      };

      const response = await axios.post(`${BASE_URL}/products/create`, requestData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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
      const token = localStorage.getItem('adminToken');
      
      // Convert and optimize files to base64
      let imageBase64Array = [];
      console.log("productData.HinhAnh",productData.HinhAnh)
      if (productData.HinhAnh && productData.HinhAnh.length > 0) {
        imageBase64Array = await Promise.all(
          productData.HinhAnh.map(file => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              const img = new Image();
              
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set maximum dimensions
                const maxWidth = 1024;
                const maxHeight = 1024;
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                  if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                  }
                } else {
                  if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress with 70% quality
              };

              img.onerror = reject;
              
              reader.onload = (e) => {
                img.src = e.target.result;
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );
      }

      const requestData = {
        ...productData,
        HinhAnh: imageBase64Array
      };

      const response = await axios.put(`${BASE_URL}/products/${id}`, requestData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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
      const token = localStorage.getItem('adminToken');

      await axios.delete(`${BASE_URL}/products/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
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