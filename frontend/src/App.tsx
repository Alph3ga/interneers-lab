import React from "react";
import ProductList from "components/ProductList";
import Navbar from "components/Navbar";

const products = [
  {
    name: "Bajaj DMH90 Neo 90L Desert Air Cooler",
    price: 10999,
    quantity: 25,
    description:
      "Air Cooler for Home|For Larger Room|BIG ICE Chamber|Anti-Bacterial Honeycomb Pads",
    category: "Home & Kitchen",
    brand: "Bajaj",
  },
  {
    name: "Nilkamal Plastic Chair",
    price: 799,
    quantity: 50,
    description: "Ergonomic plastic chair for home and garden use",
    category: "Home & Kitchen",
    brand: "Nilkamal",
  },
  {
    name: "Philips Hue Smart Bulb",
    price: 1899,
    quantity: 100,
    description: "Smart LED bulb with app control and 16M colors",
    category: "Electronics",
    brand: "Philips",
  },
  {
    name: "Adidas Running Shoes",
    price: 3499,
    quantity: 30,
    description: "Comfortable running shoes for everyday jogs",
    category: "Fashion & Apparel",
    brand: "Adidas",
  },
  {
    name: "Dettol Hand Wash",
    price: 99,
    quantity: 200,
    description: "Antibacterial liquid hand wash refill pack",
    category: "Health & Personal Care",
    brand: "Dettol",
  },
  {
    name: "Chetan Bhagat - The Girl in Room 105",
    price: 199,
    quantity: 40,
    description: "Bestselling novel by Chetan Bhagat",
    category: "Books & Stationery",
    brand: "Westland",
  },
  {
    name: "L'Oreal Paris Kajal Magique",
    price: 275,
    quantity: 70,
    description: "Waterproof and long-lasting kajal",
    category: "Beauty & Cosmetics",
    brand: "L'Oreal",
  },
  {
    name: "Uno Playing Cards",
    price: 149,
    quantity: 60,
    description: "Classic family card game",
    category: "Toys & Games",
    brand: "Mattel",
  },
  {
    name: "Bosch Car Wipers",
    price: 899,
    quantity: 35,
    description: "High-performance car windshield wipers",
    category: "Automotive",
    brand: "Bosch",
  },
  {
    name: "Stapler Machine Set",
    price: 349,
    quantity: 85,
    description: "Stapler, pins and remover combo set",
    category: "Office Supplies",
    brand: "Kangaro",
  },
  {
    name: "Drools Adult Dog Food",
    price: 2099,
    quantity: 45,
    description: "Complete nutrition for adult dogs",
    category: "Pet Supplies",
    brand: "Drools",
  },
  {
    name: "Himalaya Baby Lotion",
    price: 149,
    quantity: 90,
    description: "Gentle and soothing lotion for babies",
    category: "Baby Products",
    brand: "Himalaya",
  },
  {
    name: "Tata Tea Premium",
    price: 399,
    quantity: 120,
    description: "Rich blend of Assam and Darjeeling teas",
    category: "Groceries",
    brand: "Tata",
  },
  {
    name: "Black & Decker Drill Machine",
    price: 2599,
    quantity: 20,
    description: "Cordless drill for home improvement",
    category: "Tools & Hardware",
    brand: "Black & Decker",
  },
  {
    name: "Camlin Watercolor Kit",
    price: 299,
    quantity: 60,
    description: "Watercolor paints with brush set",
    category: "Art & Crafts",
    brand: "Camlin",
  },
  {
    name: "Lenovo Wireless Mouse",
    price: 699,
    quantity: 55,
    description: "Compact and ergonomic wireless mouse",
    category: "Electronics",
    brand: "Lenovo",
  },
  {
    name: "Cello Hot Pot",
    price: 999,
    quantity: 32,
    description: "Insulated hot pot to keep food warm",
    category: "Home & Kitchen",
    brand: "Cello",
  },
  {
    name: "Nivea Deodorant for Men",
    price: 199,
    quantity: 100,
    description: "Long-lasting freshness",
    category: "Health & Personal Care",
    brand: "Nivea",
  },
  {
    name: "Nike Cotton Socks Pack",
    price: 599,
    quantity: 75,
    description: "Pack of 3 pairs of soft ankle socks",
    category: "Fashion & Apparel",
    brand: "Nike",
  },
  {
    name: "Parker Jotter Ball Pen",
    price: 349,
    quantity: 70,
    description: "Premium ball pen with stainless steel finish",
    category: "Books & Stationery",
    brand: "Parker",
  },
  {
    name: "Maybelline Fit Me Foundation",
    price: 499,
    quantity: 85,
    description: "Matte finish liquid foundation",
    category: "Beauty & Cosmetics",
    brand: "Maybelline",
  },
  {
    name: "Monopoly Board Game",
    price: 799,
    quantity: 40,
    description: "Classic board game for family fun",
    category: "Toys & Games",
    brand: "Hasbro",
  },
  {
    name: "Car Vacuum Cleaner",
    price: 1299,
    quantity: 30,
    description: "Portable car vacuum with attachments",
    category: "Automotive",
    brand: "Eureka Forbes",
  },
  {
    name: "Desk Organizer Tray",
    price: 199,
    quantity: 120,
    description: "Compact tray for organizing office supplies",
    category: "Office Supplies",
    brand: "AmazonBasics",
  },
  {
    name: "Pedigree Puppy Food",
    price: 1799,
    quantity: 40,
    description: "Balanced food for growing puppies",
    category: "Pet Supplies",
    brand: "Pedigree",
  },
  {
    name: "Johnson's Baby Shampoo",
    price: 120,
    quantity: 95,
    description: "Tear-free formula shampoo for babies",
    category: "Baby Products",
    brand: "Johnson's",
  },
  {
    name: "Kellogg's Corn Flakes",
    price: 299,
    quantity: 130,
    description: "Breakfast cereal rich in iron and vitamins",
    category: "Groceries",
    brand: "Kellogg's",
  },
];

const productsWithImage = products.map((product, index) => ({
  ...product,
  image: "https://picsum.photos/500?random=" + index, // Default image URL
}));

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ProductList products={productsWithImage} />
    </div>
  );
};

export default App;
