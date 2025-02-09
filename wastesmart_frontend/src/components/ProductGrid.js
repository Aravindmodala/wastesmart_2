import React from "react";

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
    <div className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-gray-900 text-center">Available Products</h2>
      <p className="text-lg text-gray-600 text-center mt-2">Buy near-expiry products at discounted prices!</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-10 mt-10">
        {products.map((product, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-all duration-300">
            <img className="rounded-lg mx-auto w-40 h-40 object-cover" src={product.image} alt={product.name} />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-lg text-green-600 font-bold">{product.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
