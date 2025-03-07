import React from "react";

function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
      style={{ backgroundImage: "url('/images/earth.gif')" }}>  {/* ✅ Set Earth GIF as Background */}
      
      {/* Dark Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">🌍 Reduce Waste, Save Money</h1>
        <p className="mt-4 text-xl text-gray-200 max-w-2xl">
          Find and buy near-expiry products at discounted prices while saving the environment.
        </p>
        <button className="mt-6 bg-green-500 text-white px-6 py-3 text-lg rounded-lg font-semibold shadow-lg hover:bg-green-600 transition-all duration-300">
          Browse Products
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
