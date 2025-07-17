import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Banner />
      {loading ? (
        <p className="text-center text-gray-500 py-6">Loading products...</p>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
};

export default Home;
