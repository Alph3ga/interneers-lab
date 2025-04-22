import React from "react";
import Product from "components/Product";

const product = {
  name: "Bajaj DMH90 Neo 90L Desert Air Cooler",
  price: 10999,
  quantity: 25,
  description:
    "Air Cooler for Home | For Larger Room | BIG ICE Chamber | Anti-Bacterial Honeycomb Pads",
  category: "Home & Kitchen",
  brand: "Bajaj",
};

const image = "https://m.media-amazon.com/images/I/517a44v7f2L._SL1500_.jpg";

const App: React.FC = () => {
  return (
    <div>
      <Product product={product} image={image} />
    </div>
  );
};

export default App;
