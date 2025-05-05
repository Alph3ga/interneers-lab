import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Slider,
  Checkbox,
  FormControlLabel,
  Collapse,
  Stack,
  Button,
} from "@mui/material";

const SearchBarWithAdvanced: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [enablePrice, setEnablePrice] = useState(false);
  const [enableQuantity, setEnableQuantity] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [quantityRange, setQuantityRange] = useState([0, 10000]);

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
        />
      </Box>

      {/* Advanced Options Panel */}
      <Collapse in={showAdvanced}>
        <Box mt={2} display="flex" justifyContent="center">
          <Box width="40vw">
            <Stack spacing={2}>
              <TextField label="Name" fullWidth />
              <TextField label="Brand" fullWidth />
              <TextField label="Category" fullWidth />

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
                  max={100000}
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
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBarWithAdvanced;
