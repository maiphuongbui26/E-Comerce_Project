import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      // Store the token in localStorage
      localStorage.setItem('adminToken', response.data.token);
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
        console.error(error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
export const logoutAdmin = createAsyncThunk(
  'adminAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from localStorage
      const response = await axios.post(`${BASE_URL}/users/logout`);
      localStorage.removeItem('adminToken');
      // Remove authorization header
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCurrentAdmin = createAsyncThunk(
  'adminAuth/getCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return null;
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get user data');
    }
  }
);