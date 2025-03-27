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
  const Jackets = () => {
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
          <Typography
            variant="h4"
            sx={{
              marginTop: "50px",
              fontSize: "18px",
              color: "#303030",
              fontWeight: "600",
            }}
          >
            <span>175</span> sản phẩm <span>Đầm</span>
          </Typography>
          <Box
            sx={{ borderBottom: "1px solid #E1E1E1", paddingBottom: "38px" }}
          ></Box>
          {/* Start Product Sale */}
          <Grid2
            container
            sx={{ padding: { xs: "0 14px", md: "0" }, marginTop: "65px" }}
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center"
          >
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box sx={{ padding: "20px", bgcolor: "#fff", width: "300px" }}>
                <Box>
                  <Typography
                    onClick={() => setIsExpanded(!isExpanded)}
                    sx={{
                      fontSize: "16px",
                      color: "#303030",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    Dòng sản phẩm
                    <span
                      style={{
                        transform: isExpanded ? "rotate(45deg)" : "none",
                        transition: "transform 0.3s",
                        fontSize: "22px",
                      }}
                    >
                      +
                    </span>
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      height: "110px",
                      maxHeight: isExpanded ? "110px" : "0",
                      overflow: isExpanded ? "auto" : "hidden",
                      transition: "all 0.3s ease-in-out",
                      opacity: isExpanded ? 1 : 0,
                      position: "relative",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#D40404",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        transform: isExpanded
                          ? "translateY(0)"
                          : "translateY(-100%)",
                        transition: "transform 0.5s ease-in-out",
                      }}
                    >
                      <Box>
                        {[...Array(8)].map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              "&:last-child": {
                                mb: 0,
                              },
                            }}
                          >
                            <input type="checkbox" />
                            <Typography sx={{ ml: 1, fontSize: "14px" }}>
                              Đầm {index + 1}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Typography
                    onClick={() => setIsShowPrice(!isShowPrice)}
                    sx={{
                      fontSize: "16px",
                      color: "#303030",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    Giá
                    <span
                      style={{
                        transform: isShowPrice ? "rotate(45deg)" : "none",
                        transition: "transform 0.3s",
                        fontSize: "22px",
                      }}
                    >
                      +
                    </span>
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      height: "110px",
                      maxHeight: isShowPrice ? "110px" : "0",
                      overflow: isShowPrice ? "auto" : "hidden",
                      transition: "all 0.3s ease-in-out",
                      opacity: isShowPrice ? 1 : 0,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        transform: isShowPrice
                          ? "translateY(0)"
                          : "translateY(-100%)",
                        transition: "transform 0.5s ease-in-out",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "12px", mb: 1, fontWeight: 600 }}
                        >
                          Kéo chọn Khoảng giá
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#666",
                            fontWeight: "600",
                          }}
                        >
                          Đơn vị: <span style={{ color: "#dc0606" }}>vnd</span>
                        </Typography>
                      </Box>
                      <Box sx={{ px: 2 }}>
                        <Slider
                          value={value}
                          onChange={handleChange}
                          min={0}
                          max={5000000}
                          valueLabelDisplay="off"
                          sx={{
                            color: "#dc0606",
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#fff',
                              border: '2px solid #dc0606',
                            },
                            '& .MuiSlider-track': {
                              padding: '2px 0',
                            },
                            width: "90%"
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                          {formatPrice(value[0])}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                          {formatPrice(value[1])}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 9 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#303030', mr: 1, fontWeight: 500 }}>
                    Xem theo
                  </Typography>
                  <select style={{ 
                    padding: '8px 12px',
                    border: '1px solid #E1E1E1',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#303030',
                    outline: 'none'
                  }}>
                    <option>Mới nhất</option>
                    <option>Từ thấp đến cao</option>
                    <option>Từ cao đến thấp</option>
                  </select>
                </Box>
                <Typography sx={{fontWeight: 600, fontSize: '14px', color: '#303030' }}>
                  Hiển thị <span style={{ color: '#D40404',fontSize: "18px" }}>1 - 24 / 175</span> sản phẩm
                </Typography>
              </Box>
              <Grid2
                container
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 4, sm: 8, md: 8 }}
                justifyContent="center"
              >
                {[...Array(8)].map((_, index) => (
                  <Grid2 size={{ xs: 6, md: 2 }} key={index}>
                    <ProductItem />
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
          {/* End Product Sale */}
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "40px 0" }}
          >
            <Pagination size="large" count={10} color="secondary" />
          </Box>
        </Box>
      </>
    );
  };
  export default Jackets;
  