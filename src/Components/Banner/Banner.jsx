import React from 'react';
import { motion } from 'framer-motion';
import {  NavLink } from 'react-router';

const Banner = () => {
  // const navigate =useNavigate()
  return (
    <div
      className="relative bg-cover bg-center h-[70vh] flex items-center justify-center pt-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg')",
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold  mb-4 drop-shadow-lg">
          Fresh from Local Markets
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 drop-shadow-sm">
          Explore today’s prices of fresh vegetables and groceries. Stay informed, save money, and shop smarter every day.
        </p>
        <NavLink to='/allproducts'>
        <button  className="btn btn-primary btn-wide bg-teal-800 hover:bg-teal-700 text-white font-semibold">
          Explore Products

        </button>
          
        </NavLink>
      </motion.div>
    </div>
  );
};

export default Banner;
