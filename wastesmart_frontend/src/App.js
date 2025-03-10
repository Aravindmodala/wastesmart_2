import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Products from "./pages/Products"; 
import ProductDetails from "./pages/ProductDetails"; 
import Login from "./pages/Login"; 
import UserNavbar from "./components/Navbar";  // ✅ User Navbar
import VendorNavbar from "./components/Vendornavbar"; // ✅ Vendor Navbar
import Signup from "./pages/Signup";
import Vendors from "./pages/Vendors"; 
import VendorDetails from "./pages/VendorDetails"; 
import VOptions from "./pages/VOptions";
import VendorSignup from "./pages/VendorSignup";
import VendorLogin from "./pages/VendorSignin";
import VendorDashboard from "./pages/VendorDashboard";

function App() {
  const [cart, setCart] = useState([]); // ✅ Cart state at the top level
  const [isVendor, setIsVendor] = useState(false);

  // ✅ Check if Vendor is Logged In
  useEffect(() => {
    const vendor = JSON.parse(localStorage.getItem("vendor"));
    setIsVendor(!!vendor); // If vendor exists, set true
  }, []);

  return (
    <Router>
      {/* ✅ Show User Navbar for Users & Vendor Navbar for Vendors */}
      {isVendor ? <VendorNavbar /> : <UserNavbar cart={cart} setCart={setCart} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<VendorDetails cart={cart} setCart={setCart} />} />
        <Route path="/products/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
        
        {/* User Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Vendor Authentication */}
        <Route path="/vendor-auth" element={<VOptions />} />
        <Route path="/vendor-signup" element={<VendorSignup />} /> 
        <Route path="/vendor-login" element={<VendorLogin />} />
        
        {/* Vendor Dashboard (Only for Vendors) */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
