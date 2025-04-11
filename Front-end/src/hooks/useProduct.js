import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  toggleFavorite
} from '../redux/features/product/productThunks';
import {
  setFilters,
  setPagination,
  clearSelectedProduct,
  clearError
} from '../redux/features/product/productSlice';

export const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products,
    selectedProduct,
    isLoading,
    error,
    filters,
    pagination
  } = useSelector(state => state.products);

  const [productTypes, setProductTypes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [styles, setStyles] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`
    }
  });

  const fetchAllData = async () => {
    try {
      const [typesRes, pricesRes, stylesRes, suppliersRes] = await Promise.all([
        axios.get('http://localhost:8080/api/product-types', getAuthHeader()),
        axios.get('http://localhost:8080/api/prices', getAuthHeader()),
        axios.get('http://localhost:8080/api/styles', getAuthHeader()),
        axios.get('http://localhost:8080/api/suppliers', getAuthHeader())
      ]);

      setProductTypes(typesRes.data['product-types']);
      setPrices(pricesRes.data.prices);
      setStyles(stylesRes.data.styles);
      setSuppliers(suppliersRes.data.suppliers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFetchProducts = async (page = 1) => {
    try {
      await dispatch(fetchProducts({
        page,
        limit: pagination.limit,
        filters
      })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleFetchProductById = async (id) => {
    try {
      await dispatch(fetchProductById(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await dispatch(createProduct(productData)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await dispatch(updateProduct({ id, productData })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleDeleteProductImage = async (id, filename) => {
    try {
      await dispatch(deleteProductImage({ id, filename })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await dispatch(toggleFavorite(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSetFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSetPagination = (newPagination) => {
    dispatch(setPagination(newPagination));
  };

  const handleClearSelectedProduct = () => {
    dispatch(clearSelectedProduct());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    // State
    products,
    selectedProduct,
    isLoading,
    error,
    filters,
    pagination,
    productTypes,
    prices,
    styles,
    suppliers,

    // Methods
    fetchAllData,
    handleFetchProducts,
    handleFetchProductById,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleDeleteProductImage,
    handleToggleFavorite,
    handleSetFilters,
    handleSetPagination,
    handleClearSelectedProduct,
    handleClearError
  };
};