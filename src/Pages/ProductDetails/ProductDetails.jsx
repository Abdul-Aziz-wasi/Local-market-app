import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import ReviewSection from '../../Components/ReviewSection/ReviewSection';
import PriceComparisonChart from '../../Components/PriceComparisonChart/PriceComparisonChart';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate =useNavigate()

  const handleAddToWatchlist = async () => {
  try {
    const watchItem = {
      productId: product._id,
      productName: product.productName,
      marketName: product.marketName,
      latestPrice: product.prices?.[product.prices.length - 1]?.price,
      userEmail: user?.email,
      addedAt: new Date(),
      image: product.productImage
    };

    const res = await axios.post('https://local-market-omega.vercel.app/watchlist', watchItem);

    if (res.data?.insertedId) {
      toast.success(' Added to your watchlist');
    }
  } catch (err) {
    if (err.response?.status === 409) {
      toast.warn('⚠️ Already in your watchlist');
    } else {
      toast.error(' Failed to add');
    }
  }
};



  const handlePay=(id)=>{
    console.log('payment',id)
    navigate(`/payment/${id}`)

  }

  useEffect(() => {
    fetch(`https://local-market-omega.vercel.app/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading product details...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!product) return null;

  const {
    marketName,
    productImage,
    prices = [],
    vendor,
    createdAt,
    productName,
    itemDescription
  } = product;

  // Get latest price date or fallback to createdAt
  const displayDate = prices.length > 0
    ? new Date(prices[prices.length - 1].date).toLocaleDateString()
    : createdAt
      ? new Date(createdAt).toLocaleDateString()
      : 'N/A';

  const displayVendor = vendor || 'Unknown Vendor';

  // Assume user roles: admin, vendor, or normal user stored in user.role
  const isWatchlistDisabled = user?.role === 'admin' || user?.role === 'vendor';

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{productName}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <img
          src={productImage}
          alt={productName}
          className="w-full md:w-1/3 object-contain rounded"
        />

        {/* Product Details */}
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-2">
            🏪 <strong>Market:</strong> {marketName}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            📅 <strong>Date:</strong> {displayDate}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            👨‍🌾 <strong>Vendor:</strong> {displayVendor}
          </p>

          <p className="mb-4 text-gray-600">{itemDescription}</p>

          {/* Price list */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Prices:</h2>
            {prices.length === 0 && <p>No price data available.</p>}
            {prices.map(({ date, price }, idx) => (
              <p key={idx} className="text-gray-700">
                🥕 {new Date(date).toLocaleDateString()} — ৳{price}/kg
              </p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
  onClick={handleAddToWatchlist}
  disabled={isWatchlistDisabled}
  className={`px-4 py-2 rounded text-white ${
    isWatchlistDisabled
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-teal-600 hover:bg-teal-700'
  }`}
>
  ⭐ Add to Watchlist
</button>
            <button
              onClick={() => handlePay(product._id)}
              className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white"
            >
              🛒 Buy Product
            </button>
          </div>
        </div>
      </div>

      <ReviewSection></ReviewSection>
      <PriceComparisonChart prices={prices}></PriceComparisonChart>

      
    </motion.div>
  );
};

export default ProductDetails;
