import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import ProductGrid from "../components/ProductGrid";
import { motion } from "framer-motion";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      {/* 🌍 Hero Section with Rotating Earth */}
      <HeroSection />

      {/* 🚀 Middle Section - Login Call to Action */}
      <motion.div 
        className="w-full py-10 text-center bg-gray-950 text-white mx-auto -mt-10 shadow-lg"
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {user ? (
          <h2 className="text-2xl font-semibold">Welcome, {user}! 🎉</h2>
        ) : (
          <div className="mt-8">
            <p className="text-lg text-gray-300">
              Login to access personalized features!
            </p>
            <motion.a 
              href="/login" 
              className="text-green-400 font-semibold text-lg hover:text-green-300 transition-all"
              whileHover={{ scale: 1.1 }}
            >
              Login Here
            </motion.a>
          </div>
        )}
      </motion.div>

      {/* ⭐ Features Section */}
      <FeatureSection />

      {/* 🛍️ Product Grid Section */}
      <ProductGrid />
    </div>
  );
}

export default Home;
