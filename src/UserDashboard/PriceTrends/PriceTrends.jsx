import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const PriceTrends = () => {
  const { data = [] } = useQuery({
    queryKey: ['priceTrends'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/price-trends'); // Make sure this exists
      return res.json();
    },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📊 Price Trend Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrends;
