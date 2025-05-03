import { useState, useEffect } from "react";
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

// This is the list of all valid category labels
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
  // State to hold the product data
  const [product, setProduct] = useState<Product | null>(null);

  // State to indicate whether the product fetch is still loading
  const [loading, setLoading] = useState<Boolean>(true);

  // State for showing success or error messages to the user
  // If null, the Alert is not shown
  const [successMessage, setSuccessMessage] = useState<String | null>(null);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  // Fetch product data from the backend
  useEffect(() => {
    axios.get(`http://localhost:8080/products/${productId}`).then((res) => {
      setProduct(res.data); // set the fetched product data to state
      setLoading(false); // set loading to false after data is fetched
    });
  }, [productId]);

  // Handle input changes for each product field, taken as user input
  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => (prev ? { ...prev, [field]: value } : prev)); // update specific field in the product object
  };

  // Send a PATCH request to '/products/<productId>'
  const handleSave = async () => {
    if (!product) return;

    // Clear previous messages
    setSuccessMessage(null);

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
        // Check if the error was an Axios error
        if (!error?.response) {
          setErrorMessage(
            "Server returned status code " + error?.response?.status,
          );
        }
      }
      setErrorMessage("Sorry, unknown error."); // generic error message
      console.error("Failed to update product:", error);
    }
  };

  if (loading || !product) return <div>Loading...</div>; // show loading indicator while fetching

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Product {productId}
      </Typography>

      {/* Success alert box */}
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {/* Error alert box*/}
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Name"
        value={product.name}
        onChange={(e) => handleChange("name", e.target.value)} // update name field
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={product.price}
        onChange={(e) => handleChange("price", parseFloat(e.target.value))} // update price field
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Quantity"
        type="number"
        value={product.quantity}
        onChange={(e) => handleChange("quantity", parseInt(e.target.value))} // update quantity field
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Brand"
        value={product.brand}
        onChange={(e) => handleChange("brand", e.target.value)} // update brand field
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        maxRows={4}
        value={product.description}
        onChange={(e) => handleChange("description", e.target.value)} // update description field
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={product.category}
          label="Category"
          onChange={(e) => handleChange("category", e.target.value)} // update category field
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat} {/* display category option */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Save button */}
      <Button variant="contained" onClick={handleSave}>
        {" "}
        Save Changes
      </Button>
    </Box>
  );
};

export default EditProduct;
