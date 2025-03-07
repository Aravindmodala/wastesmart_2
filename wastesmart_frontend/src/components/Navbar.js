import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { signOut, onAuthStateChanged } from "firebase/auth"; 

function Navbar({ cart, setCart }) {
  const [user, setUser] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.max(1 - window.scrollY / 300, 0);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
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

        {/* Logo */}
        <h1 
          className="text-3xl font-bold text-green-400 cursor-pointer tracking-wide hover:text-green-300 transition-all"
          onClick={() => navigate("/")}
        >
          WasteSmart 🚀
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-200 text-lg">
          <Link to="/products" className="hover:text-green-400 transition">Products</Link>
          <Link to="/vendors" className="hover:text-green-400 transition">Vendors</Link>
          {user && <Link to="/orders" className="hover:text-green-400 transition">My Orders</Link>}
        </div>

        {/* Right Section: Login + Cart + User */}
        <div className="flex items-center space-x-6">

          {/* User Icon & Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all shadow-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 <span>{user.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white shadow-lg rounded-lg p-4 border border-gray-600">
                  <h3 className="text-lg font-semibold">User Info</h3>
                  <p className="text-gray-400 mt-2">📧 {user.email}</p>
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
              to="/login" 
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 transition-all shadow-md"
            >
              Login
            </Link>
          )}

          {/* Cart Button */}
          <div className="relative">
            <button 
              className="relative flex items-center space-x-2 bg-white/10 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-all shadow-md"
              onClick={() => setCartOpen(!cartOpen)}
            >
              🛒 <span>Cart</span>
              {cart && cart.length > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                  {cart.length}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white shadow-xl rounded-lg p-4 border border-gray-600">
                <h3 className="text-lg font-semibold border-b pb-2">Your Cart</h3>
                {cart.length > 0 ? (
                  <ul className="mt-2">
                    {cart.map((item, index) => (
                      <li key={`${item.id}-${index}`} className="flex justify-between items-center border-b py-2">
                        <span>{item.name} - ${item.price}</span>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(index)}
                        >
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mt-2">Cart is empty.</p>
                )}
                {cart.length > 0 && (
                  <button 
                    className="mt-3 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
