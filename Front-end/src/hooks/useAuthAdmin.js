import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, logoutAdmin,getCurrentAdmin } from '../redux/features/auth/adminAuthThunks';

export const useAuthAdmin = () => {
  const dispatch = useDispatch();
  const { admin, isLoading, error, isAuthenticated } = useSelector(state => state.authAdmin);

  const handleAdminLogin = async (credentials) => {
    try {
      await dispatch(loginAdmin(credentials)).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleAdminLogout = async () => {
    try {
     const res =  await dispatch(logoutAdmin()).unwrap();
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const getAdmin = async() => {
    try {
       await dispatch(getCurrentAdmin()).unwrap()
       return admin
    } catch (error) {
        console.error(error);
    }
  };

  return { admin, isLoading, error, isAuthenticated,getAdmin, handleAdminLogin, handleAdminLogout };
};