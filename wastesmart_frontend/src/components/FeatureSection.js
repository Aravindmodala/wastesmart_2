import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaShoppingCart, FaDollarSign } from "react-icons/fa";

// Features Data
const features = [
  { icon: <FaLeaf size={50} />, title: "Eco-Friendly", description: "Reduce food waste by buying near-expiry products." },
  { icon: <FaShoppingCart size={50} />, title: "Smart Shopping", description: "Get fresh deals and discounted items every day." },
  { icon: <FaDollarSign size={50} />, title: "Save Money", description: "Enjoy up to 50% off on essential groceries." },
];

function FeatureSection() {
  return (
    <motion.section 
      className="py-20 px-6 bg-gray-950 text-center text-white"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section Title */}
      <motion.h2 
        className="text-5xl font-extrabold tracking-wide text-green-400"
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        Why Choose WasteSmart?
      </motion.h2>
      
      {/* Subtitle */}
      <motion.p 
        className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        We help you save money and the planet by connecting you with near-expiry products at great prices.
      </motion.p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-12">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-500 border border-gray-700 hover:border-green-500 hover:shadow-green-400"
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="text-green-400">{feature.icon}</div>
            <h3 className="text-2xl font-bold mt-4">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default FeatureSection;
