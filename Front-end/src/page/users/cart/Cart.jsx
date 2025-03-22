import { Box } from "@mui/material";
import SearchForm from "../../../component/header/SearchForm";

const Cart = () => {
  return (
    <>
      <SearchForm />
      <Box sx={{ flexGrow: 1,maxWidth: "1240px",margin: "0 auto" }}>
         <span>Cart</span>
      </Box>
    </>
  );
};
export default Cart;
