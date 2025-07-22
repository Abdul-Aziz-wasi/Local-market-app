import React, { useState, use } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Login from '../../Pages/Login/Login';
import { motion } from 'framer-motion';

const Products = ({ productsPromise }) => {
  const products = use(productsPromise);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');

  return (
    <div>
      <h3 className='text-3xl text-teal-700 text-center mt-4 font-bold'>Products</h3>
     
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
       className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 py-10">
        {
          products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              openLoginModal={() => setIsLoginOpen(true)}
              setRedirectTo={setRedirectTo}
            />
          ))
        }
      </motion.div>

    
      <Login 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={redirectTo}
      />
    </div>
  );
};

export default Products;
