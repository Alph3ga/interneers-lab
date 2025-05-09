import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/styles.css";

import { ProductDataWithImage } from "interfaces";

type ProductProps = { product: ProductDataWithImage };

const Product: React.FC<ProductProps> = ({ product }) => {
  // State to track if details are expanded
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleDetails = () => {
    setExpanded((prev) => !prev);
  };

  // Required for programmatic navigation
  const navigate = useNavigate();

  // Redirects to the edit product page on clicking the button
  const handleEdit = () => {
    const id = product.id;
    navigate("/product/" + id);
  };

  return (
    <div className={`product-tile ${!expanded ? "collapsed" : ""}`}>
      <button className="edit-button" onClick={handleEdit}>
        ✎ Edit
      </button>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <div className="product-title" onClick={toggleDetails}>
          {product.name}
        </div>

        {!expanded && (
          <div className="ellipsis" onClick={toggleDetails}>
            ...
          </div>
        )}

        <div className="product-category">
          <strong>Category:</strong> {product.category}
        </div>

        {expanded && (
          <>
            <div className="product-brand">
              <strong>Brand:</strong> {product.brand}
            </div>
            <div className="product-description">{product.description}</div>
          </>
        )}

        <div className="product-price">₹{product.price.toLocaleString()}</div>

        <div className="product-quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min={1}
            max={product.quantity}
            defaultValue={1}
          />
          <span className="available">({product.quantity} available)</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
