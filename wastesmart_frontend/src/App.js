import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // ✅ Correct
import Products from "./pages/Products"; // ✅ Correct
import ProductDetails from "./pages/SP"; 
import Login from "./pages/Login"; // ✅ Correct
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Vendors from "./pages/Vendors"; // ✅ Correct
import VendorDetails from "./pages/VendorDetails"; // ✅ Correct


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<VendorDetails />} />
        <Route path="/products/:id" element={<ProductDetails />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
