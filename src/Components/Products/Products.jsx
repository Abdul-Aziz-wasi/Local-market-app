// Products.jsx
import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Login from '../../Pages/Login/Login';

const Products = ({ products }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/'); // ✅ Default fallback

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  return (
    <>
      <div className="py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            openLoginModal={openLoginModal}
            setRedirectTo={setRedirectTo} // ✅ pass setter
          />
        ))}
      </div>

      <Login isOpen={isLoginOpen} onClose={closeLoginModal} redirectTo={redirectTo} />
    </>
  );
};

export default Products;
