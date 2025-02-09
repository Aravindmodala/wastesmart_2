import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex justify-between items-center shadow-lg sticky top-0 z-50">
      <h1 className="text-3xl font-extrabold tracking-wide">🌱 WasteSmart</h1>
      <div className="space-x-8 text-lg font-semibold">
        <Link className="hover:text-gray-300 transition-all duration-300" to="/">Home</Link>
        <Link className="hover:text-gray-300 transition-all duration-300" to="/products">Products</Link>
        <Link className="hover:text-gray-300 transition-all duration-300" to="/login">Login</Link>
      </div>
      <Link to="/signup" className="bg-white text-blue-600 px-5 py-2 rounded-lg font-bold shadow-md hover:bg-blue-100 transition-all duration-300">
        Get Started
      </Link>
    </nav>
  );
}

export default Navbar;
