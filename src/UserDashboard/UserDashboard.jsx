import React from 'react';
import { Link, Outlet } from 'react-router';

const UserDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">📊 User Dashboard</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard/trends">📈 View Price Trends</Link></li>
          <li><Link to="/dashboard/watchlist">⭐ Manage Watchlist</Link></li>
          <li><Link to="/dashboard/orders">🛒 My Order List</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
