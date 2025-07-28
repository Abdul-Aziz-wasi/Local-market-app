import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Login from '../Login/Login';
import { motion } from 'framer-motion';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', limit);
    if (sortOrder) params.append('sort', sortOrder);

    fetch(`http://localhost:3000/all-products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, currentPage]);

  const handleViewDetails = (id) => {
    if (!user) {
      setRedirectTo(`/products/${id}`);
      setLoginModalOpen(true);
    } else {
      navigate(`/products/${id}`);
    }
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  if (loading) {
    return <p className="text-center py-10">Loading all products...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <h2 className="text-3xl font-bold text-teal-800 text-center mb-6">🧺 All Products</h2>

      {/* Sort Control */}
      <div className="flex justify-end mb-6">
        <div>
          <label className="block text-sm mb-1">Sort By Price</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">-- Select --</option>
            <option value="lowToHigh">🔼 Low to High</option>
            <option value="highToLow">🔽 High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const {
            _id,
            productImage,
            productName,
            marketName,
            prices = [],
            vendor,
            createdAt,
          } = product;

          const currentPrice = prices[prices.length - 1]?.price || 'N/A';
          const displayDate = prices[prices.length - 1]?.date
            ? new Date(prices[prices.length - 1].date).toLocaleDateString()
            : new Date(createdAt).toLocaleDateString();

          return (
            <div
              key={_id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <img
                src={productImage}
                alt={productName}
                className="h-40 object-contain w-full mb-4"
              />
              <h3 className="text-lg font-semibold">🥕 {productName}</h3>
              <p className="text-sm text-gray-700">💵 ৳{currentPrice}/kg</p>
              <p className="text-sm text-gray-700">📅 {displayDate}</p>
              <p className="text-sm text-gray-700">🏪 {marketName}</p>
              <p className="text-sm text-gray-700">👨‍🌾 {vendor}</p>
              <button
                onClick={() => handleViewDetails(_id)}
                className="mt-3 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              >
                🔍 View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === i + 1
                ? 'bg-teal-600 text-white'
                : 'bg-white text-teal-700 border-teal-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Login Modal */}
      {loginModalOpen && (
        <Login
          isOpen={loginModalOpen}
          onClose={handleCloseModal}
          redirectTo={redirectTo}
        />
      )}
    </motion.div>
  );
};

export default AllProducts;
