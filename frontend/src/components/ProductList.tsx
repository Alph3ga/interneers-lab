import React, { useState } from "react";
import Product from "./Product";
import "styles/productlist.css";

interface ProductData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  brand: string;
  image: string;
}

interface Navigation {
  self: string;
  next: string | null;
  prev: string | null;
  pages: number;
  current: number;
}

interface ProductListProps {
  products: ProductData[];
  navigation: Navigation | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, navigation }) => {
  return (
    <div>
      <div className="product-list">
        <div className="display-info">
          Displaying page {navigation?.current} of {navigation?.pages} pages
        </div>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
