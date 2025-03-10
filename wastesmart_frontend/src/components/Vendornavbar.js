import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function VendorNavbar() {
  const [vendor, setVendor] = useState(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVendor = JSON.parse(localStorage.getItem("vendor"));
    setVendor(storedVendor);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.max(1 - window.scrollY / 300, 0);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vendor");
    navigate("/vendor-login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav 
      className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg shadow-lg z-50 transition-opacity duration-500"
      style={{ opacity: scrollOpacity }} 
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Vendor Panel Logo */}
        <h1 
          className="text-3xl font-bold text-green-400 cursor-pointer tracking-wide hover:text-green-300 transition-all"
          onClick={() => navigate("/vendor-dashboard")}
        >
          Vendor Panel 🚀
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-200 text-lg">
          <Link to="/vendor-products" className="hover:text-green-400 transition">Manage Products</Link>
          <Link to="/vendor-sales" className="hover:text-green-400 transition">View Sales</Link>
        </div>

        {/* Right Section: User Info + Logout */}
        <div className="flex items-center space-x-6">
          {vendor ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all shadow-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 <span>{vendor.vendor_name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white shadow-lg rounded-lg p-4 border border-gray-600">
                  <h3 className="text-lg font-semibold">Vendor Info</h3>
                  <p className="text-gray-400 mt-2">📧 {vendor.email || "No Email"}</p>
                  <button 
                    className="mt-3 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/vendor-login" 
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 transition-all shadow-md"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default VendorNavbar;
