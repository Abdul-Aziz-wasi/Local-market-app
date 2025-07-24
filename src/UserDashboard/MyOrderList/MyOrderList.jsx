import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthContext';

const MyOrderList = () => {
  const { user } = useContext(AuthContext);

  const { data: orders = [] } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/payments/${user.email}`);
      return res.json();
    },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🛒 My Orders</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Product</th>
            <th>Date</th>
            <th>Price</th>
            <th>Txn ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="text-center border-t">
              <td className="p-2">{order.productName}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>৳{order.price}</td>
              <td>{order.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrderList;
