import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: orders = [] } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email, // avoid running if email is undefined
    queryFn: async () => {
      const res = await fetch(`https://local-market-omega.vercel.app/payments/${user.email}`);
      return res.json();
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">🛒 My Orders</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Product ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{order.productId}</td>
              <td className="p-2">৳{order.amount}</td>
              <td className="p-2">{new Date(order.paid_at).toLocaleDateString()}</td>
              <td className="p-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/products/${order.productId}`)}
                >
                  🔍 View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
