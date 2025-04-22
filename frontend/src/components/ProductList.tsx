import React, { useState } from "react";
import Product from "./Product";
import "styles/productlist.css";

interface ProductData {
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  brand: string;
  image: string;
}

interface ProductListProps {
  products: ProductData[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const itemsPerPage = 10; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when next page is clicked
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when previous page is clicked
    }
  };

  return (
    <div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <Product product={product} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
