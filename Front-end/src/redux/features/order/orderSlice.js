import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOrders,
  fetchOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus
} from './orderThunks';

const initialState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    dateRange: {
      start: null,
      end: null
    }
  },
  totalOrders: 0,
  stats: {
    pending: 0,
    confirmed: 0,
    shipping: 0,
    completed: 0,
    cancelled: 0
  }
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateOrderStats: (state) => {
      state.stats = state.orders.reduce((acc, order) => {
        acc[order.status.toLowerCase()] = (acc[order.status.toLowerCase()] || 0) + 1;
        return acc;
      }, {});
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Order By Id
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        state.totalOrders += 1;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload);
        state.totalOrders -= 1;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Actions
export const { setFilters, clearSelectedOrder, clearError, updateOrderStats } = orderSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectSelectedOrder = (state) => state.orders.selectedOrder;
export const selectOrderLoading = (state) => state.orders.isLoading;
export const selectOrderError = (state) => state.orders.error;
export const selectOrderFilters = (state) => state.orders.filters;
export const selectTotalOrders = (state) => state.orders.totalOrders;
export const selectOrderStats = (state) => state.orders.stats;

export default orderSlice.reducer;