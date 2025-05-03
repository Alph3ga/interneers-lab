import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  brand: string;
}

const categories = [
  "Electronics",
  "Home & Kitchen",
  "Health & Personal Care",
  "Fashion & Apparel",
  "Books & Stationery",
  "Sports & Outdoors",
  "Beauty & Cosmetics",
  "Toys & Games",
  "Automotive",
  "Office Supplies",
  "Pet Supplies",
  "Baby Products",
  "Groceries",
  "Tools & Hardware",
  "Art & Crafts",
];

const EditProduct = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const [successMessage, setSuccessMessage] = useState<String | null>(null);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${productId}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [productId]);

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!product) return;

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.patch(
        `http://localhost:8080/products/${productId}`,
        {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
          description: product.description,
          brand: product.brand,
        },
      );

      if (response.status === 204) {
        setSuccessMessage("Product updated successfully.");
      } else {
        setErrorMessage(
          "Unexpected response from server. Status code: " + response.status,
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          setErrorMessage(
            "Server returned status code " + error?.response?.status,
          );
        }
      }
      setErrorMessage("Server error.");
      console.error("Failed to update product:", error);
    }
  };

  if (loading || !product) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Product {productId}
      </Typography>

      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Name"
        value={product.name}
        onChange={(e) => handleChange("name", e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={product.price}
        onChange={(e) => handleChange("price", parseFloat(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Quantity"
        type="number"
        value={product.quantity}
        onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Brand"
        value={product.brand}
        onChange={(e) => handleChange("brand", e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        maxRows={4}
        value={product.description}
        onChange={(e) => handleChange("description", e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={product.category}
          label="Category"
          onChange={(e) => handleChange("category", e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditProduct;
