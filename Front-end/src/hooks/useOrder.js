import { useDispatch, useSelector } from 'react-redux';
import { createOrder, fetchOrders, fetchOrderById, updateOrderStatus } from '../redux/features/order/orderThunks';
import { selectAllOrders, selectOrderLoading, selectOrderError } from '../redux/features/order/orderSlice';

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders,error,isLoading  } = useSelector(
    (state) => state.orders
  );
  const handleCreateOrder = async (orderData) => {
    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  const handleFetchOrders = async () => {
    try {
      const result = await dispatch(fetchOrders()).unwrap();
      return result;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  const handleFetchOrderById = async (orderId) => {
    try {
      const result = await dispatch(fetchOrderById(orderId)).unwrap();
      return result;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const result = await dispatch(updateOrderStatus({ orderId, status })).unwrap();
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      return null;
    }
  };

  return {
    orders,
    isLoading,
    error,
    handleCreateOrder,
    handleFetchOrders,
    handleFetchOrderById,
    handleUpdateOrderStatus
  };
};