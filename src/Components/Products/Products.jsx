import React from 'react';
import ProductCard from '../ProductCard/ProductCard';


const Products = ({ products }) => {
  return (
    <div className="py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
