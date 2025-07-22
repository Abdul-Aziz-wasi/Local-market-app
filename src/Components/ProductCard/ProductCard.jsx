import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

const ProductCard = ({ product, openLoginModal, setRedirectTo }) => {
  const { 
    productName, 
    productImage, 
    marketName, 
    prices = [], 
    createdAt,
    status 
  } = product;
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Get the latest price (first item in prices array)
  const priceDate = prices[0]?.date 
    ? new Date(prices[0].date).toLocaleDateString() 
    : new Date(createdAt).toLocaleDateString();

  const handleViewDetails = () => {
    if (!user) {
      setRedirectTo(`/products/${product._id}`);
      openLoginModal();
    } else {
      navigate(`/products/${product._id}`);
    }
  };

  // Only show approved products
  if (status !== 'approved') return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={productImage} 
          alt={productName} 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{productName}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">🏪 {marketName}</span>
          <span className="text-sm text-gray-500">📅 {priceDate}</span>
        </div>
        
        {/* Price List */}
        <div className="border-t pt-2 mt-2">
          {prices.slice(0, 3).map((price, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="text-gray-700">{price.date}</span>
              <span className="font-medium text-teal-600">৳{price.price}/kg</span>
            </div>
          ))}
          {prices.length > 3 && (
            <div className="text-sm text-gray-500 text-right">
              +{prices.length - 3} more prices
            </div>
          )}
        </div>
      </div>
      
      {/* View Details Button */}
      <div className="px-4 pb-4">
        <button 
          onClick={handleViewDetails}
          className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center"
        >
           View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
