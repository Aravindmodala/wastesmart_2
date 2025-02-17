import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);  // ✅ Added setProducts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ Fetch vendor details
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

    // ✅ Fetch only products related to this vendor
    fetch(`http://127.0.0.1:8000/vendors/vendors/vendors/${id}/products`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products.");
        return response.json();
      })
      .then((data) => {
        setProducts(data); // ✅ setProducts is now properly defined
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading vendor details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{vendor?.name}</h2>
      <p className="text-gray-700">📍 Location: {vendor?.location}</p>
      <p className="text-gray-700">📞 Contact: {vendor?.contact}</p>

      <h3 className="text-2xl font-semibold mt-6">Products from {vendor?.name}</h3>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p className="text-gray-700">💰 Price: ${product.price}</p>
              <p className="text-gray-700">📦 Stock: {product.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">
          No products available from {vendor?.name || "this vendor"}.
        </p>
      )}
    </div>
  );
}

export default VendorDetails;
