import { Box, Container } from '@mui/material';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
  return (
    <>
    <Header/>
    <Container sx={{ maxWidth: "1240px" }}>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
       <Outlet/>
      </Box>
    </Container>  
    <Footer/>
    </>
  );
};
export default UserLayout;