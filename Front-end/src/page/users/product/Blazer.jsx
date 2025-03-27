import {
    Box,
    Grid2,
    Pagination,
    Slider,
    Typography,
  } from "@mui/material";
  import SearchForm from "../../../component/header/SearchForm";
  import ProductItem from "../../../component/main_component/productItem";
  import { useState } from "react";
  
  const Blazer = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [value, setValue] = useState([0, 5000000]);
    const [isShowPrice, setIsShowPrice] = useState(true);
    // Update the initial state value
    
    // Format number with commas
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>
        <Box sx={{ maxWidth: "1240px", margin: "0 auto" }}>
          <SearchForm />
          {/* Start Breadcrumbs */}
          <Box></Box>
          {/* End Breadcrumbs */}
         
          {/* Start Product Sale */}
          <Grid2
            container
            sx={{ padding: { xs: "0 14px", md: "0" }, marginTop: "65px" }}
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center"
          >
                {[...Array(8)].map((_, index) => (
                  <Grid2 size={{ xs: 6, md: 3 }} key={index}>
                    <ProductItem />
                  </Grid2>
                ))}
          </Grid2>
          {/* End Product Sale */}
          <Box
            sx={{ borderBottom: "1px solid #E1E1E1", paddingBottom: "38px",marginBottom:"38px"}}
          ></Box>
        </Box>
      </>
    );
  };
  export default Blazer;
  