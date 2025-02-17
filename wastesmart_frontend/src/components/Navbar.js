import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);  // ✅ Track dropdown state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white relative">
      {/* ✅ Clickable logo */}
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        WasteSmart
      </h1>

      {/* ✅ Navbar Links */}
      <div className="flex items-center gap-6">
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/vendors" className="hover:underline">Vendors</Link>
        {user && <Link to="/orders" className="hover:underline">My Orders</Link>}
      </div>

      {/* ✅ User Profile Dropdown */}
      <div className="relative">
        {user ? (
          <div className="flex items-center gap-4">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="font-semibold focus:outline-none">
              👤 {user} ▼
            </button>

            {/* ✅ Profile Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white text-black shadow-lg rounded-lg border border-gray-300 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="px-4">Login</Link>
        )}  
      </div>
    </nav>
  );
}

export default Navbar;
