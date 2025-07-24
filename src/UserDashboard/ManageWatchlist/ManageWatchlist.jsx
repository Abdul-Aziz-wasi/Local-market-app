import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthContext';

const ManageWatchlist = () => {
  const { user } = useContext(AuthContext);
  const { data: watchlist = [], refetch } = useQuery({
    queryKey: ['watchlist', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/watchlist/${user.email}`);
      return res.json();
    },
  });

  const handleRemove = async (id) => {
    await fetch(`http://localhost:3000/watchlist/${id}`, { method: 'DELETE' });
    refetch();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">⭐ My Watchlist</h2>
      <ul className="space-y-3">
        {watchlist.map(item => (
          <li key={item._id} className="border p-4 rounded flex justify-between">
            <span>{item.productName}</span>
            <button onClick={() => handleRemove(item._id)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageWatchlist;
