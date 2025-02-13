import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/products/products/"; 

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        console.log("API Response Status:", response.status); // ✅ Log status
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response Data:", data); // ✅ Log response data
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-xl font-semibold mt-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600 text-xl mt-10">{error}</div>;

  return (
    <div className="py-16 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-900">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
              <p className="text-lg text-gray-700">${product.price}</p>
              <p className="text-sm text-gray-500">Expires: {product.expiry_date}</p>
              <Link to={`/products/${product.id}`}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
                  View Product
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
