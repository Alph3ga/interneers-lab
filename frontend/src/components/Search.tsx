import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Slider,
  Checkbox,
  Collapse,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";

import { ProductData, Navigation } from "interfaces";

interface SearchBarProps {
  setNavigation: React.Dispatch<React.SetStateAction<Navigation | null>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
}

const SearchBarWithAdvanced: React.FC<SearchBarProps> = ({
  setNavigation,
  setProducts,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [basicSearch, setBasicSearch] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [enablePrice, setEnablePrice] = useState(false);
  const [enableQuantity, setEnableQuantity] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [quantityRange, setQuantityRange] = useState([0, 500]);

  const handleSearch = async () => {
    const params: any = {};

    params.limit = 10;

    if (!showAdvanced) {
      if (basicSearch) params.name = basicSearch;
    } else {
      if (name) params.name = name;
      if (brand) params.brand = brand;
      if (category) params.category = category;
      if (enablePrice) {
        params.price_greater_than_e = priceRange[0];
        params.price_less_than_e = priceRange[1];
      }
      if (enableQuantity) {
        params.quantity_greater_than_e = quantityRange[0];
        params.quantity_less_than_e = quantityRange[1];
      }
    }

    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URI + "/products",
        { params },
      );
      setProducts(response.data.data);
      setNavigation(response.data.navigation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mt={4}>
      {/* Search bar */}
      <Box display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search..."
          sx={{ width: "40vw" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? "Hide advanced" : "Advanced options"}
                </Typography>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setBasicSearch(e.target.value)}
        />
      </Box>

      {/* Advanced Options Panel */}
      <Collapse in={showAdvanced}>
        <Box mt={2} display="flex" justifyContent="center">
          <Box width="40vw">
            <Stack spacing={2}>
              <TextField
                label="Name"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Brand"
                fullWidth
                onChange={(e) => setBrand(e.target.value)}
              />
              <TextField
                label="Category"
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
              />

              <Typography>Filter by Price:</Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="on"
                  disabled={!enablePrice}
                  min={0}
                  max={10000}
                  sx={{
                    width: "35vw",
                    "& .MuiSlider-valueLabel": {
                      fontSize: 12,
                      fontWeight: "normal",
                      top: -6,
                      backgroundColor: "unset",
                      "&::before": {
                        display: "none",
                      },
                      "& *": {
                        background: "transparent",
                        color: "#000",
                      },
                    },
                  }}
                  size="small"
                />
                <Checkbox
                  checked={enablePrice}
                  onChange={(e) => setEnablePrice(e.target.checked)}
                />
              </Box>

              <Typography>Filter by Quantity:</Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Slider
                  value={quantityRange}
                  onChange={(_, newValue) => setQuantityRange(newValue)}
                  valueLabelDisplay="on"
                  disabled={!enableQuantity}
                  min={0}
                  max={500}
                  sx={{
                    width: "35vw",
                    "& .MuiSlider-valueLabel": {
                      fontSize: 12,
                      fontWeight: "normal",
                      top: -6,
                      backgroundColor: "unset",
                      "&::before": {
                        display: "none",
                      },
                      "& *": {
                        background: "transparent",
                        color: "#000",
                      },
                    },
                  }}
                  size="small"
                />
                <Checkbox
                  checked={enableQuantity}
                  onChange={(e) => setEnableQuantity(e.target.checked)}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Collapse>
      {/* Search button */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBarWithAdvanced;
