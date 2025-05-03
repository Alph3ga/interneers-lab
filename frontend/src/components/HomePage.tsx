import React, { useEffect, useState } from "react";
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

const HomePage = () => {
  const LIMIT = 10;
  const [products, setProducts] = useState<Product[]>([]);
  const [navigation, setNavigation] = useState<Navigation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (start?: number, limit: number = LIMIT) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ProductListResponse>(
        "http://localhost:8080/products",
        {
          params: { start, limit },
        },
      );
      setProducts(response.data.data);
      setNavigation(response.data.navigation);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsURI = async (URI: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ProductListResponse>(
        "http://localhost:8080" + URI,
      );
      setProducts(response.data.data);
      setNavigation(response.data.navigation);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNextPage = () => {
    if (navigation?.next) {
      fetchProductsURI(navigation.next);
    }
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    if (navigation?.prev) {
      fetchProductsURI(navigation.prev);
    }
    window.scrollTo(0, 0);
  };

  const productsWithImage = products.map((product, index) => ({
    ...product,
    image: "https://picsum.photos/500?random=" + index, // Default image URL
  }));

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

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
