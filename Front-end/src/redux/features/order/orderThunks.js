import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, orderData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);