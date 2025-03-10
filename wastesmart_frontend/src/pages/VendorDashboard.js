import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");

    console.log("Stored Vendor (Raw):", storedVendor);

    if (!storedVendor) {
      console.warn("No vendor data found. Redirecting to login...");
      navigate("/vendor-login");
      return;
    }

    try {
      const vendorData = JSON.parse(storedVendor);
      console.log("Parsed Vendor Data:", vendorData);

      if (!vendorData.vendor_name) {
        throw new Error("Vendor data is missing required fields.");
      }

      setVendor(vendorData);
    } catch (error) {
      console.error("Error parsing vendor JSON:", error);
      localStorage.removeItem("vendor"); // 🔥 Remove corrupted data
      navigate("/vendor-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vendor");
    navigate("/vendor-login");
  };

  if (!vendor) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-green-400">Vendor Dashboard</h2>
        <p className="text-gray-400 mt-2">Welcome, {vendor.vendor_name}!</p>

        <div className="mt-4 text-left text-gray-300">
          <p><strong>Email:</strong> {vendor.email || "N/A"}</p>
          <p><strong>Business:</strong> {vendor.business_category || "N/A"}</p>
          <p><strong>Contact:</strong> {vendor.contact || "N/A"}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-red-600 transition-all shadow-md text-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;
