import React, { useEffect, useState } from 'react';

const TrendingItems = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch('https://local-market-omega.vercel.app/trending-products') 
      .then(res => res.json())
      .then(data => setTrending(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">🔥 Top Trending Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {trending.map(item => (
          <div key={item._id} className="bg-white p-4 shadow rounded-lg text-center">
            <img src={item.productImage} alt={item.productName} className="w-full h-32 object-contain mb-3" />
            <h3 className="text-lg font-semibold">{item.productName}</h3>
            <p className="text-sm text-gray-600">৳{item.prices?.at(-1)?.price}/kg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingItems;
