import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/vendors/vendors/vendors/${id}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading product details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="text-gray-700">💰 Price: ${product.price}</p>
      <p className="text-gray-700">📦 Stock: {product.quantity}</p>
      <p className="text-gray-700">📅 Expiry Date: {product.expiry_date}</p>
      <p className="text-gray-700">🏪 Vendor: {product.vendor_name}</p>
    </div>
  );
}

export default ProductDetails;
