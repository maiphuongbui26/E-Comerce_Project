import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../redux/features/payment/paymentThunks';
import { clearError } from '../redux/features/payment/paymentSlice';

export const usePayment = () => {
  const dispatch = useDispatch();
  const { paymentUrl, isLoading, error } = useSelector((state) => state.payment);

  const handleCreatePayment = async (amount, orderInfo, returnUrl) => {
    try {
      await dispatch(createPayment({ amount, orderInfo, returnUrl })).unwrap();
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    paymentUrl,
    isLoading,
    error,
    handleCreatePayment,
    handleClearError,
  };
};