import { Box, Grid2, Pagination, Typography } from "@mui/material";
import SearchForm from "../../../component/header/SearchForm";
import ProductItem from "../../../component/main_component/productItem";


const Dresses =()=>{
    return(
        <>
        <Box sx={{maxWidth: "1240px",margin: "0 auto"}}>
            <SearchForm/>
            {/* Start Breadcrumbs */}
            <Box>
            </Box>
            {/* End Breadcrumbs */}
            {/* Start Product Sale */}
            <Grid2
              container
              sx={{padding: {xs: "0 14px", md: "0"},marginTop: "65px"}}
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="center"
            >
                <Grid2
                  size={{ xs: 6, md: 2 }}
                >
                </Grid2>
                <Grid2
                  size={{ xs: 6, md: 8 }}
                >
            <Grid2
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 8 }}
              justifyContent="center"
            >
              {[...Array(8)].map((_, index) => (
                <Grid2
                  size={{ xs: 6, md: 2 }}
                  key={index}
                >
                  <ProductItem />
                </Grid2>
              ))}
            </Grid2>
            </Grid2>
            </Grid2>
            {/* End Product Sale */}
            <Box sx={{display: "flex",justifyContent: "center",margin: "40px 0"}}>
            <Pagination size="large" count={10} color="secondary" />
            </Box>
        </Box>
        </>
    )
}
export default Dresses;