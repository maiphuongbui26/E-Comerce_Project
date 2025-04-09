import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, logoutAdmin } from './adminAuthThunks';

const initialState = {
  admin: null,
  isLoading: false,
  error: null,
  isAuthenticated: false
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Add logout cases
      .addCase(logoutAdmin.fulfilled, (state) => {
        return initialState;
      });
  },
});

export default adminAuthSlice.reducer;