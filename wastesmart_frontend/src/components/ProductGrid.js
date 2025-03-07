import React from "react";
import { motion } from "framer-motion";

const products = [
  { name: "Organic Bananas", price: "$1.50", image: "https://source.unsplash.com/200x200/?banana" },
  { name: "Fresh Milk", price: "$2.00", image: "https://source.unsplash.com/200x200/?milk" },
  { name: "Whole Grain Bread", price: "$1.80", image: "https://source.unsplash.com/200x200/?bread" },
  { name: "Tomatoes", price: "$1.20", image: "https://source.unsplash.com/200x200/?tomatoes" },
  { name: "Carrots", price: "$0.99", image: "https://source.unsplash.com/200x200/?carrots" },
  { name: "Spinach", price: "$1.50", image: "https://source.unsplash.com/200x200/?spinach" },
];

function ProductGrid() {
  return (
    <div className="py-16 bg-gray-950 text-center text-white">
      
      {/* Breathing Effect on Text */}
      <motion.p 
        className="text-xl font-extrabold tracking-wide text-green-400 mt-4"
        animate={{ opacity: [0.6, 1, 0.6] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Buy near-expiry products at discounted prices!
      </motion.p>

      {/* Section Title */}
      <h2 className="text-5xl font-extrabold tracking-wide text-green-400 mt-4">
        Available Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-10 mt-10">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-gray-900 p-6 rounded-lg shadow-lg text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <img className="rounded-lg mx-auto w-40 h-40 object-cover" src={product.image} alt={product.name} />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-lg text-green-400 font-bold">{product.price}</p>
            <button 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
