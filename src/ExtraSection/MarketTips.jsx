import React from 'react';

const MarketTips = () => {
  const tips = [
    {
      title: 'Buy Seasonal Produce',
      description: 'Fruits and vegetables in season are cheaper and fresher.',
    },
    {
      title: 'Compare Prices Before Buying',
      description: 'Check prices in nearby markets to ensure the best deal.',
    },
    {
      title: 'Visit Markets in the Morning',
      description: 'Morning markets usually offer better quality and options.',
    },
    {
      title: 'Track Daily Price Trends',
      description: 'Use our app to monitor changes and buy at the right time.',
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">💡 Market Tips & Advice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-teal-700 mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTips;
