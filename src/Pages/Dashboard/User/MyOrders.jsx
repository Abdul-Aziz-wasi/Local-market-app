import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: orders = [] } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`https://local-market-omega.vercel.app/payments/${user.email}`);
      return res.json();
    },
  });

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">🛒 My Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm md:text-base">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 whitespace-nowrap">🆔 Product ID</th>
              <th className="p-2 whitespace-nowrap">💰 Amount</th>
              <th className="p-2 whitespace-nowrap">📅 Date</th>
              <th className="p-2 whitespace-nowrap">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2 break-all">{order.productId}</td>
                  <td className="p-2">৳{order.amount}</td>
                  <td className="p-2">{new Date(order.paid_at).toLocaleDateString()}</td>
                  <td className="p-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      onClick={() => navigate(`/products/${order.productId}`)}
                    >
                      🔍 View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
