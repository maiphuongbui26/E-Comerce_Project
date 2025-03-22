import React from "react";
import Slider from "react-slick";
import { Box, Button, TextField, Typography } from "@mui/material";

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Box className="relative" sx={{ margin: "0 auto" }}>
        <Slider {...settings}>
          <div>
            <img src="../../../../public/image/poster_1.jpg" alt="Slide 1" />
          </div>
          <div>
            <img src="../../../../public/image/poster_2.jpg" alt="Slide 2" />
          </div>
          <div>
            <img src="../../../../public/image/poster_3.jpg" alt="Slide 3" />
          </div>
        </Slider>
        <Box
          sx={{
            position: "absolute",
            width: "680px",
            bottom: "5%",
            left: "50%",
            backgroundColor: "#fff",
            transform: "translate(-50%, -50%)",
            display: { xs: "none", md: "flex"},
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "3px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Bạn muốn tìm sản phẩm gì?"
            sx={{
              backgroundColor: "transparent",
              color: "#000",
              width: "80%",
              "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "10px 20px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
              },
              "&:hover fieldset": {
                border: "none", 
                outline: "none",
              }
            }}
          />
         <Button
            variant="contained"
            sx={{
              backgroundColor: "#303030",
              display: "block",
              height: "100%",
              padding: "10px 10px",
              borderRadius: "0 4px 4px 0",
              fontSize: "12px", 
              fontWeight: "bold",
            }}
          >
            Tìm kiếm ngay
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
