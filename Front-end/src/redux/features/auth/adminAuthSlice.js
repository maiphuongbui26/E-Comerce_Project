import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, logoutAdmin,getCurrentAdmin  } from './adminAuthThunks';

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
      })

      //get current admin
      .addCase(getCurrentAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
        // state.role = action.payload.role;
      })
      .addCase(getCurrentAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
        // state.role = null;
      });
  },
});

export default adminAuthSlice.reducer;