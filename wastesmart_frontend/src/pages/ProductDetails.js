import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
      
    fetch(`http://127.0.0.1:8000/vendors/vendors/${id}/products`)
      .then((response) => {
        console.log("API Response Status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Product Data:", data);
        if (!data || Object.keys(data).length === 0) {
          setError("Product not found.");
        } else {
          setProduct(data); // ✅ Set product object (not array)
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log("Cart after adding product:", updatedCart);
      return updatedCart;
    });
  };

  if (loading) return <p className="text-center mt-6 text-lg text-gray-400">Loading product details...</p>;
  if (error) return <p className="text-center text-red-600 text-lg">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6 py-12">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg max-w-2xl w-full text-center">
        
        {/* ✅ Product Image */}
        <img
          src={product.image_url || "https://via.placeholder.com/200"}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg mb-6"
        />

        {/* ✅ Product Name */}
        <h2 className="text-3xl font-bold text-green-400">{product.name}</h2>

        {/* ✅ Price & Stock */}
        <p className="text-xl font-semibold mt-2">${product.price}</p>
        <p className="text-gray-400">📦 Stock: {product.quantity}</p>

        {/* ✅ Expiry Date Handling */}
        <p className="text-gray-400">📅 Expiry Date: {product.expiry_date || "Not Available"}</p>

        {/* ✅ Vendor Info */}
        <p className="text-gray-400">🏪 Vendor: {product.vendor_name || "Unknown"}</p>

        {/* ✅ Add to Cart Button */}
        <button
          onClick={addToCart}
          className="w-full bg-blue-500 text-white py-3 mt-6 rounded-lg hover:bg-blue-600 transition-all font-bold text-lg"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
