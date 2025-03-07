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

  if (loading) return <p className="text-center mt-6 text-lg text-gray-400">Loading vendors...</p>;
  if (error) return <p className="text-center text-red-600 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 pt-24 pb-12">
      <h2 className="text-4xl font-extrabold text-center text-green-400 mb-8">Vendors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div key={vendor.id} className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              
              {/* ✅ Vendor Name */}
              <h3 className="text-2xl font-bold text-green-300">{vendor.name}</h3>

              {/* ✅ Location & Contact */}
              <p className="text-gray-400 mt-2">📍 {vendor.location || "Location Unavailable"}</p>
              <p className="text-gray-400">📞 {vendor.contact || "No Contact Info"}</p>

              {/* ✅ View Details Button */}
              <Link to={`/vendors/${vendor.id}`}>
                <button className="mt-4 w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">No vendors available.</p>
        )}
      </div>
    </div>
  );
}

export default Vendors;
