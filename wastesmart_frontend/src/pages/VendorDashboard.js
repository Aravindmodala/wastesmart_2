import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBox, FiShoppingCart, FiTrendingUp, FiLogOut } from "react-icons/fi";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");

    if (!storedVendor) {
      navigate("/vendor-login");
      return;
    }

    try {
      const vendorData = JSON.parse(storedVendor);

      // Debugging: Log stored vendor data
      console.log("Retrieved Vendor Data:", vendorData);

      if (!vendorData.vendor_name || !vendorData.email) {
        throw new Error("Missing fields in vendor data.");
      }

      setVendor(vendorData);
    } catch (error) {
      console.error("Vendor data parsing error:", error);
      localStorage.removeItem("vendor"); 
      navigate("/vendor-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vendor"); // ✅ Correct key
    navigate("/vendor-login");
  };

  if (!vendor) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-950 text-white px-6 py-8 pt-20">
      
      {/* Dashboard Header */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold text-green-400">🚀 Vendor Dashboard</h2>
        <p className="text-gray-400 mt-2">Welcome, {vendor.vendor_name}!</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full max-w-3xl">
        
        {/* Sales Overview */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
          <FiTrendingUp size={30} className="text-green-400 mb-2" />
          <h3 className="text-xl font-semibold">Total Sales</h3>
          <p className="text-green-300 text-2xl font-bold">$1,200</p>
        </div>

        {/* Products Listed */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
          <FiBox size={30} className="text-blue-400 mb-2" />
          <h3 className="text-xl font-semibold">Products Listed</h3>
          <p className="text-blue-300 text-2xl font-bold">15</p>
        </div>

        {/* Orders Received */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
          <FiShoppingCart size={30} className="text-yellow-400 mb-2" />
          <h3 className="text-xl font-semibold">Orders Received</h3>
          <p className="text-yellow-300 text-2xl font-bold">8</p>
        </div>

      </div>

      {/* Vendor Info */}
      <div className="mt-6 bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-green-400">Vendor Info</h3>
        <div className="mt-3 text-gray-300">
          <p><strong>📧 Email:</strong> {vendor.email ? vendor.email : "Email not available"}</p>
          <p><strong>🏪 Business:</strong> {vendor.business_category || "N/A"}</p>
          <p><strong>📞 Contact:</strong> {vendor.contact || "N/A"}</p>
        </div>
      </div>

      {/* Business Growth Tips */}
      <div className="mt-6 bg-gray-800 p-4 rounded-xl shadow-md w-full max-w-3xl">
        <h3 className="text-lg font-semibold text-green-400">💡 Business Tip</h3>
        <p className="text-gray-400 mt-2 italic">
          "Offer discounts on products nearing expiry to boost sales and reduce waste!"
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center space-x-2 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-all shadow-md text-lg font-semibold"
      >
        <FiLogOut size={20} />
        <span>Logout</span>
      </button>
      
    </div>
  );
};

export default VendorDashboard;
