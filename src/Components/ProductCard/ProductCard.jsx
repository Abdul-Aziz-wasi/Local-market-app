import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🗓️ Check for today’s date in price history
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayPrices = product.prices?.find(p => p.date === today);

  // 👇 Filter only approved products
  if (product.status !== 'approved') return null;

  const handleDetailsClick = () => {
    if (!user) {
      toast.warn('Please login to view product details 🔐');
      return navigate('/login');
    }
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-800">{product.marketName}</h2>
        <p className="text-sm text-gray-600">📅 {product.date}</p>

        <ul className="text-sm text-gray-700 space-y-1">
          {product.items.map((item, idx) => (
            <li key={idx}>
              🧅 {item.name} — ৳{item.price}/kg
            </li>
          ))}
        </ul>

        {todayPrices && (
          <div className="text-xs text-green-600">
            ✅ Updated for today ({today})
          </div>
        )}

        <button
          onClick={handleDetailsClick}
          className="mt-3 w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded transition"
        >
          🔍 View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
