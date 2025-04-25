import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async ({ amount, orderInfo, returnUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/create_payment_url`, {
        amount,
        orderInfo,
        returnUrl,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);