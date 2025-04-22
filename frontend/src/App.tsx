import React from "react";
import ProductList from "components/ProductList";
import Navbar from "components/Navbar";

const product = {
  name: "Bajaj DMH90 Neo 90L Desert Air Cooler",
  price: 10999,
  quantity: 25,
  description:
    "Air Cooler for Home | For Larger Room | BIG ICE Chamber | Anti-Bacterial Honeycomb Pads",
  category: "Home & Kitchen",
  brand: "Bajaj",
  image: "https://m.media-amazon.com/images/I/517a44v7f2L._SL1500_.jpg",
};

const products = Array(15).fill(product);

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ProductList products={products} />
    </div>
  );
};

export default App;
