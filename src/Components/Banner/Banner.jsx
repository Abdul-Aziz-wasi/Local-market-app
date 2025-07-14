import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg')",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-4 drop-shadow-lg">
          Fresh from Local Markets
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-orange-400 drop-shadow-sm">
          Explore today’s prices of fresh vegetables and groceries. Stay informed, save money, and shop smarter every day.
        </p>
        <button className="btn btn-primary btn-wide bg-teal-800 hover:bg-teal-700 text-white font-semibold">
          Explore Products
        </button>
      </motion.div>
    </div>
  );
};

export default Banner;
