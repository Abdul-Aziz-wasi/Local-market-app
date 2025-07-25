import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';

import { FaChartLine, FaHeart, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthContext';

const DashboardLayout = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => console.log('Sign out user'))
      .catch(console.error);
      navigate('/')
  };

  const menuItems = [
    {
      path: '/dashboard/price-trends',
      label: '📊 Price Trends',
      icon: <FaChartLine />,
    },
    {
      path: '/dashboard/watchlist',
      label: '🛠️ Manage Watchlist',
      icon: <FaHeart />,
    },
    {
      path: '/dashboard/orders',
      label: '🛒 My Orders',
      icon: <FaShoppingCart />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-teal-700 text-white p-4 space-y-6">
        <div className="text-2xl font-bold">📦 Dashboard</div>
        <div className="space-y-4">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-teal-600 ${
                  isActive ? 'bg-teal-800' : ''
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
            
          ))}
          <li>
    <Link to="/" className="hover:text-teal-600 font-medium">
      🏠 Home
    </Link>
  </li>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-10 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, {user?.displayName || 'User'} 👋</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
