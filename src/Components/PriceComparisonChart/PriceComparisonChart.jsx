import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const PriceComparisonChart = ({ prices = [] }) => {
  const [selectedDate, setSelectedDate] = useState('');

  // Sort the price data by date (oldest to newest)
  const sortedPrices = useMemo(() => {
    return [...prices].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [prices]);

  // Format data for Recharts
  const chartData = useMemo(() => {
    return sortedPrices.map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      price: entry.price,
    }));
  }, [sortedPrices]);

  // Handle date selection for comparison
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const selectedPriceObj = sortedPrices.find(p => p.date === selectedDate);
  const latestPrice = sortedPrices[sortedPrices.length - 1];

  const priceDifference = selectedPriceObj
    ? latestPrice.price - selectedPriceObj.price
    : null;

  return (
    <div className="my-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">📊 Price Comparison</h2>

      {/* Date selector */}
      <div className="mb-4">
        <label className="mr-2 text-gray-700 font-medium">Compare with date:</label>
        <select onChange={handleDateChange} className="border border-gray-300 p-2 rounded">
          <option value="">Select a date</option>
          {sortedPrices.map((entry, index) => (
            <option key={index} value={entry.date}>
              {new Date(entry.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* Price difference info */}
      {selectedPriceObj && (
        <p className="text-gray-700 mb-4">
          📅 On <strong>{new Date(selectedPriceObj.date).toLocaleDateString()}</strong>, price was <strong>৳{selectedPriceObj.price}</strong>.
          <br />
          📈 Difference from latest price:
          <span className={`ml-2 font-semibold ${priceDifference > 0 ? 'text-red-500' : 'text-green-600'}`}>
            {priceDifference > 0
              ? `Increased by ৳${priceDifference}`
              : `Decreased by ৳${Math.abs(priceDifference)}`}
          </span>
        </p>
      )}

      {/* Recharts Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#14b8a6"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceComparisonChart;
