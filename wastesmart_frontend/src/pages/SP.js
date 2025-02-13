import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/products/products"; // ✅ Fix: Matches actual API path

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`); // ✅ Fix: Uses correct URL format
        console.log("API Request URL:", `${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Product Data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Product not found or API unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center text-xl font-semibold mt-10">Loading product...</div>;
  if (error) return <div className="text-center text-red-600 text-xl mt-10">{error}</div>;

  return (
    <div className="py-16 bg-gray-50 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/5">
        <h2 className="text-4xl font-bold text-gray-900 text-center mt-4">{product.name}</h2>
        <p className="text-lg font-bold text-center mt-2 text-blue-500">
          Expires on: {product.expiry_date || "N/A"}
        </p>
        <p className="text-lg font-bold text-center text-green-600">${product.price}</p>

        <div className="mt-6 text-center">
          <Link to="/products">
            <button className="text-blue-500 hover:underline">← Back to Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
