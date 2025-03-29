import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/profile`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);