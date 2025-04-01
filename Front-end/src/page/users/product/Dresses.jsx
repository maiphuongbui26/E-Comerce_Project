import {
  Box,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import SearchForm from "../../../component/header/SearchForm";
import ProductItem from "../../../component/main_component/productItem";
import { useState } from "react";

const Dresses = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const priceRanges = [
    { value: 'under350', label: 'Dưới 350.000đ' },
    { value: '350to750', label: 'Từ 350.000đ - 750.000đ' },
    { value: 'above750', label: 'Trên 750.000đ' }
  ];
  const handlePriceRangeToggle = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };
  return (
    <>
      <Box sx={{ maxWidth: "1240px", margin: "0 auto" }}>
        <SearchForm />
        <Box></Box>
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
        <Box sx={{ borderBottom: "1px solid #E1E1E1", paddingBottom: "38px" }} />
        <Grid2
          container
          sx={{ padding: { xs: "0 14px", md: "0" }, marginTop: "65px" }}
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Box sx={{ padding: "20px", bgcolor: "#fff", width: "300px" }}>
              {/* Product Line Filter */}
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
                  <Box>
                    {[...Array(8)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          "&:last-child": { mb: 0 },
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

              {/* Price Filter */}
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
                  Theo giá
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
                    maxHeight: isShowPrice ? "250px" : "0",
                    overflow: isShowPrice ? "visible" : "hidden",
                    transition: "all 0.3s ease-in-out",
                    opacity: isShowPrice ? 1 : 0,
                  }}
                >
                  <Box>
                    {priceRanges.map((range) => (
                      <Box
                        key={range.value}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          "&:last-child": { mb: 0 },
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range.value)}
                          onChange={() => handlePriceRangeToggle(range.value)}
                          style={{ cursor: 'pointer' }}
                        />
                        <Typography sx={{ ml: 1, fontSize: "14px" }}>
                          {range.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid2>
          {/* Product Grid */}
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
                Hiển thị <span style={{ color: '#D40404', fontSize: "18px" }}>1 - 24 / 175</span> sản phẩm
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

        <Box sx={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
          <Pagination size="large" count={10} color="secondary" />
        </Box>
      </Box>
    </>
  );
};

export default Dresses;
