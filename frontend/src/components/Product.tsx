import React, { useState } from "react";
import "styles/styles.css";

interface ProductProps {
  product: {
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    brand: string;
    image: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleDetails = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`product-tile ${!expanded ? "collapsed" : ""}`}>
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
