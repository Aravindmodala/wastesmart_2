import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VendorDetails() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/vendors/vendors/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Vendor not found.");
        return response.json();
      })
      .then((data) => {
        setVendor(data);
      })
      .catch((err) => {
        console.error("Error fetching vendor:", err);
        setError("Vendor not found.");
      });

    fetch(`http://127.0.0.1:8000/vendors/vendors/vendors/${id}/products`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products.");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <p className="text-center text-lg text-gray-400 mt-6">Loading vendor details...</p>;
  if (error) return <p className="text-center text-red-600 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 pt-24 pb-12">
      
      {/* ✅ Vendor Info Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-extrabold text-green-400">{vendor?.name}</h2>
        <p className="text-gray-400 mt-2">📍 {vendor?.location}</p>
        <p className="text-gray-400">📞 {vendor?.contact}</p>
      </div>

      {/* ✅ Cart Display */}
      <div className="text-right text-green-400 font-semibold mt-6">
        🛒 Cart: {cart.length} items
      </div>

      {/* ✅ Products Section */}
      <h3 className="text-3xl font-semibold text-center text-green-300 mt-12">Products from {vendor?.name}</h3>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition"
            >
              {/* ✅ Product Name */}
              <h4 className="text-2xl font-bold text-white">{product.name}</h4>
              
              {/* ✅ Price & Stock */}
              <p className="text-lg text-gray-400 mt-2">💰 Price: ${product.price}</p>
              <p className="text-sm text-gray-400">📦 Stock: {product.quantity}</p>

              {/* ✅ Add to Cart Button */}
              <button 
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition font-bold text-lg"
                onClick={() => addToCart(product)}
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400 mt-6">
          No products available from {vendor?.name || "this vendor"}.
        </p>
      )}
    </div>
  );
}

export default VendorDetails;
