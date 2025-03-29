import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserProfile,
} from './userThunks';

const initialState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  totalUsers: 0,
  filters: {
    search: '',
    status: 'all',
    role: 'all'
  }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch User By Id
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
        state.totalUsers += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.totalUsers -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Actions
export const { setFilters, clearSelectedUser, clearError } = userSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.users.users;
export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectUserLoading = (state) => state.users.isLoading;
export const selectUserError = (state) => state.users.error;
export const selectUserFilters = (state) => state.users.filters;
export const selectTotalUsers = (state) => state.users.totalUsers;

export default userSlice.reducer;