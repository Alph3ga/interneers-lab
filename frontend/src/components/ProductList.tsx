import React from "react";
import Product from "./Product";
import "styles/productlist.css";

import { ProductDataWithImage, Navigation } from "interfaces";

interface ProductListProps {
  products: ProductDataWithImage[];
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
