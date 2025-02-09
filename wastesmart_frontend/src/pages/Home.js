import React from "react";
import HeroSection from "../components/HeroSection"; 
import FeatureSection from "../components/FeatureSection"; 
import ProductGrid from "../components/ProductGrid";

function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <ProductGrid />
    </div>
  );
}

export default Home;
