import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock
} from './productThunks';

const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    priceRange: {
      min: 0,
      max: null
    },
    sortBy: 'newest',
    status: 'all'
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    limit: 10
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
          limit: action.payload.limit
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Product By Id
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Product Stock
      .addCase(updateProductStock.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Actions
export const { 
  setFilters, 
  clearSelectedProduct, 
  clearError, 
  setPage, 
  setLimit 
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductLoading = (state) => state.products.isLoading;
export const selectProductError = (state) => state.products.error;
export const selectProductFilters = (state) => state.products.filters;
export const selectProductPagination = (state) => state.products.pagination;

export default productSlice.reducer;