import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";

import "styles/homepage.css";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  category: string;
}

interface Navigation {
  self: string;
  next: string | null;
  prev: string | null;
  pages: number;
  current: number;
}

interface ProductListResponse {
  data: Product[];
  navigation: Navigation;
}

/**
 * HomePage component
 *
 * Displays a paginated list of products by fetching data from the backend API.
 * Handles client-side pagination, loading state, and error display.
 */
const HomePage = () => {
  const LIMIT = 10; // Number of products per page

  // State to hold the current list of products
  const [products, setProducts] = useState<Product[]>([]);

  // State to manage pagination navigation data, fetched from backend
  const [navigation, setNavigation] = useState<Navigation | null>(null);

  // Loading state to indicate if a fetch is in progess
  const [loading, setLoading] = useState<boolean>(false);

  // Error message state
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (start?: number, limit: number = LIMIT) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.get<ProductListResponse>(
        process.env.REACT_APP_API_BASE_URI + "/products",
        {
          params: { start, limit },
        },
      );
      setProducts(response.data.data); // Set fetched products
      setNavigation(response.data.navigation); // Set pagination info
    } catch (err) {
      setError("Failed to fetch products."); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch based on URi
  const fetchProductsURI = async (URI: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ProductListResponse>(
        process.env.REACT_APP_API_BASE_URI + URI,
      );
      setProducts(response.data.data); // Update products
      setNavigation(response.data.navigation); // Update navigation
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Go to the next page if available
  const handleNextPage = () => {
    if (navigation?.next) {
      fetchProductsURI(navigation.next);
    }
    window.scrollTo(0, 0); // Scroll to top
  };

  // Go to the previous page if available
  const handlePrevPage = () => {
    if (navigation?.prev) {
      fetchProductsURI(navigation.prev);
    }
    window.scrollTo(0, 0); // Scroll to top
  };

  // Add placeholder images to each product
  const productsWithImage = products.map((product, index) => ({
    ...product,
    image: "https://picsum.photos/500?random=" + index, // Random image from Picsum for thumbnails
  }));

  return (
    <div>
      {loading && <p>Loading...</p>}
      {/* Loading indicator, shown conditionally */}
      {error && <p>{error}</p>} {/* Error message, shown conditionally */}
      <ProductList products={productsWithImage} navigation={navigation} />
      {navigation && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={!navigation.prev}>
            Previous
          </button>
          <span>
            Page {navigation.current} of {navigation.pages}
          </span>
          <button onClick={handleNextPage} disabled={!navigation.next}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
