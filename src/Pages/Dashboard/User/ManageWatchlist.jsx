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
      const res = await fetch(`https://local-market-omega.vercel.app/watchlist/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Removed from watchlist');
      queryClient.invalidateQueries(['watchlist', user.email]);
    },
    onError: () => toast.error('Failed to remove'),
  });

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">🛠️ Manage Watchlist</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm md:text-base">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 whitespace-nowrap">📦 Product</th>
              <th className="p-2 whitespace-nowrap">🏪 Market</th>
              <th className="p-2 whitespace-nowrap">📅 Date</th>
              <th className="p-2 whitespace-nowrap">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.length > 0 ? (
              watchlist.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.productName}</td>
                  <td className="p-2">{item.marketName}</td>
                  <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => navigate('/allproducts')}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                       Add More
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                       Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No items in your watchlist yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWatchlist;
