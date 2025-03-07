import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Products from "./pages/Products"; 
import ProductDetails from "./pages/ProductDetails";  // ✅ Fixed Import
import Login from "./pages/Login"; 
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Vendors from "./pages/Vendors"; 
import VendorDetails from "./pages/VendorDetails"; 
import VOptions from "./pages/VOptions";
import VendorSignup from "./pages/VendorSignup";
import VendorLogin from "./pages/VendorSignin";


function App() {
  const [cart, setCart] = useState([]); // ✅ Cart state at the top level

  return (
    <Router>
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/vendors" element={<Vendors />} />
        
        {/* ✅ Passing cart & setCart correctly */}
        <Route path="/vendors/:id" element={<VendorDetails cart={cart} setCart={setCart} />} />
        <Route path="/products/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-auth" element={<VOptions />} />
        <Route path="/vendor-signup" element={<VendorSignup />} /> 
        <Route path="/vendor-login" element={<VendorLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
