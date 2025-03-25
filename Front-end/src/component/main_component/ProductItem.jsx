import { Box, IconButton, Rating, Typography } from "@mui/material"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";


const ProductItem = ({ product }) => {
  return (
    <div>
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
    </div>  
)}
export default ProductItem