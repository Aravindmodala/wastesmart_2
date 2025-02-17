import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection"; 
import FeatureSection from "../components/FeatureSection"; 
import ProductGrid from "../components/ProductGrid";


function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");  // ✅ Get user email from storage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      <HeroSection />

      {user ? (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">Welcome, {user}! 🎉</h2>
          <p className="text-gray-600">We're glad to have you here!</p>
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-600">Login to access personalized features!</p>
          <a href="/login" className="text-blue-500 underline">Login Here</a>
        </div>
      )}

      <FeatureSection />
      <ProductGrid />
    </div>
  );
}

export default Home;