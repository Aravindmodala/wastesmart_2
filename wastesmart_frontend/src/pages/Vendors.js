import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/vendors/vendors/")
      .then((response) => response.json())
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
        setError("Failed to load vendors.");
        setLoading(false);
      });
  }, []);   

  if (loading) return <p className="text-center mt-6">Loading vendors...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Nearby Vendors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold">{vendor.name}</h3>
            <p className="text-gray-700">📍 {vendor.location}</p>
            <p className="text-gray-700">📞 {vendor.contact}</p>
            <Link to={`/vendors/${vendor.id}`}>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vendors;
