import React from "react";
import { FaLeaf, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const features = [
  { icon: <FaLeaf size={40} />, title: "Eco-Friendly", description: "Reduce food waste by buying near-expiry products." },
  { icon: <FaShoppingCart size={40} />, title: "Smart Shopping", description: "Get fresh deals and discounted items every day." },
  { icon: <FaDollarSign size={40} />, title: "Save Money", description: "Enjoy up to 50% off on essential groceries." },
];

function FeaturesSection() {
  return (
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-900">Why Choose WasteSmart?</h2>
      <p className="text-lg text-gray-600 mt-3 max-w-xl mx-auto">We help you save money and the planet by connecting you with near-expiry products at great prices.</p>

      <div className="flex justify-center gap-8 mt-10">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-64 hover:scale-105 transition-transform duration-300">
            <div className="text-green-600">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mt-3">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
