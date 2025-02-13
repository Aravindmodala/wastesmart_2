import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // ✅ Correct
import Products from "./pages/Products"; // ✅ Correct
import ProductDetails from "./pages/SP"; // ✅ Fixed import name (capitalized)
import Login from "./pages/Login"; // ✅ Correct
import Navbar from "./components/Navbar"; // ✅ Fixed extra "/"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
