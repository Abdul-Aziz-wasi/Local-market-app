import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://local-market-omega.vercel.app/orders')
      .then(res => setOrders(res.data))
      .catch(() => toast.error('Failed to load orders'));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">🛒 All Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Buyer Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.productName}</td>
                <td>{order.buyerEmail}</td>
                <td>${order.amount}</td>
                <td className="capitalize text-green-600">{order.status}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-center mt-4">No orders found.</p>}
      </div>
    </div>
  );
};

export default AllOrders;
