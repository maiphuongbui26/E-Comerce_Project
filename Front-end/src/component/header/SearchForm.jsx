import React from "react";
import Slider from "react-slick";
import { Box, Button, TextField, Typography } from "@mui/material";

const SearchForm = () => {
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
      <Box
        sx={{
          width: "680px",
          backgroundColor: "#fff",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "3px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add box shadow
          margin: "0 auto", // Center horizontally
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
            },
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
            textTransform: "none",
          }}
        >
          Tìm kiếm ngay
        </Button>
      </Box>
    </>
  );
};

export default SearchForm;
