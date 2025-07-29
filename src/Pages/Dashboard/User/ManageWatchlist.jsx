import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';

const ManageWatchlist = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: watchlist = [] } = useQuery({
    queryKey: ['watchlist', user.email],
    queryFn: async () => {
      const res = await fetch(`https://local-market-omega.vercel.app/watchlist/${user.email}`);
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://local-market-omega.vercel.app/watchlist/${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Removed from watchlist');
      queryClient.invalidateQueries(['watchlist', user.email]);
    },
    onError: () => toast.error('Failed to remove'),
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">🛠️ Manage Watchlist</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Product</th>
            <th className="p-2">Market</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.productName}</td>
              <td className="p-2">{item.marketName}</td>
              <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => navigate('/allproducts')}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  ➕ Add More
                </button>
                <button
                  onClick={() => deleteMutation.mutate(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  ❌ Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWatchlist;
