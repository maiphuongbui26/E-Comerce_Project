import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/features/auth/authThunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return { user, loading, error, handleLogin };
};