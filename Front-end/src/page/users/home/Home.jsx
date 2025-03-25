import React from "react";
import Slider from "react-slick";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
    {/* Start Banner */}
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
            display: { xs: "none", md: "flex" },
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
            }}
          >
            Tìm kiếm ngay
          </Button>
        </Box>
      </Box>
      {/*End Banner */}
      {/* Start container */}
      <Box sx={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/*Start Category */}
        <Box
          sx={{
            padding: "60px 0 70px",
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-block",
                border: "1px dashed #969696",
                padding: "9px",
                borderRadius: "50%",
                marginRight: index < 4 ? "30px" : "0", // Remove margin for the last item
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#EEEEEE",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  padding: "15px 0",
                  "&:hover ": {
                    cursor: "pointer",
                    background: "#303030",
                  },
                  "&:hover img": {
                    filter: "invert(1)",
                    transform: "rotateY(360deg)",
                    transition: "transform .4s ease-out",
                  },
                  "&:hover .MuiTypography-root": {
                    color: "#fff",
                  },
                }}
              >
                <img
                  width={40}
                  height={40}
                  src="../../../../public/image/dam.png"
                  alt=""
                />
                <Typography
                  sx={{
                    color: "#303030",
                    fontWeight: "600",
                    marginTop: "15px",
                    textTransform: "uppercase",
                    lineHeight: "14px",
                    fontSize: "14px",
                  }}
                >
                  Đầm
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {/*End Category */}
        {/* Start product style  */}
        <Grid2
          sx={{ display: { xs: "none", md: "flex" } }}
          container
          spacing={2}
          justifyContent="center"
        >
          {[
            "poster_1.jpg",
            "poster_2.jpg",
            "poster_3.jpg",
            "poster_4.jpg",
            "poster_5.jpg",
            "poster_6.jpg",
          ].map((image, index) => (
            <Grid2 item size={{ xs: 12, md: 6 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  ":hover img": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                  },
                }}
              >
                <img
                  src={`../../../../public/image/${image}`}
                  alt={`Image ${index + 1}`}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>
        {/* End product style   */}
        {/* Start Best saler */}
        <Box>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: "25px",
                lineHeight: "24px",
                color: "#303030",
                padding: "40px 0 20px",
                display: { xs: "none", md: "block" },
              }}
            >
              SẢN PHẨM BÁN CHẠY
            </Typography>
            <Grid2
              container
              sx={{padding: {xs: "0 14px", md: "0 100px"}}}
              spacing={{ xs: 1, md: 3 }}
              justifyContent="center"
            >
              {[...Array(6)].map((_, index) => (
                <Grid2
                  size={{ xs: 6, md: 2 }}
                  key={index}
                >
                  <Box sx={{ "&:hover ": {
                    transform: "translateY(-10px) scale(1.02)",
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                  }}}>
                    <img
                      src="../../../../public/image/image_product_1.jpeg"
                      alt=""
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#303030",
                        lineHeight: "20px",
                        margin: "13px 0 7px",
                        overflow: "hidden",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        fontWeight: "600",
                      }}
                    >
                      Chân váy đổ 2 tầng đan dây
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            padding: "3px",
                            display: "inline-block",
                          }}
                        >
                          <Typography
                            sx={{
                              width: "14px",
                              height: "14px",
                              display: "block",
                              borderRadius: "50%",
                              border: "1px solid #D8D8D8",
                            }}
                          ></Typography>
                        </Box>
                        <Box
                          sx={{
                            borderRadius: "50%",
                            padding: "3px",
                            display: "inline-block",
                          }}
                        >
                          <Typography
                            sx={{
                              width: "14px",
                              height: "14px",
                              display: "block",
                              borderRadius: "50%",
                              border: "1px solid #D8D8D8",
                            }}
                          ></Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "inline-block", marginLeft: "10px" }}>
                        <IconButton sx={{ color: "#808284", p: 0 }}>
                          <FavoriteBorderOutlinedIcon
                            sx={{ fontSize: "20px" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        sx={{ "&.MuiRating-sizeMedium": { fontSize: "16px" } }}
                        name="half-rating"
                        defaultValue={2.5}
                        precision={0.5}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#656565",
                          lineHeight: "20px",
                          fontWeight: "600",
                        }}
                      >
                        (322 đã bán)
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Box>
      {/* End Best saler */}
      </Box>
      {/* End container */}
    </>
  );
};

export default Home;
