import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import Swal from 'sweetalert2';

const MyProducts = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const { data: products = [], refetch } = useQuery({
    queryKey: ['vendorProducts', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://local-market-omega.vercel.app/vendor-products/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This action can't be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`https://local-market-omega.vercel.app/products/${id}`);
      toast.success('Product deleted successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to delete product');
      console.error(err);
    }
  }
};


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📄 My Submitted Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Price</th>
              <th className="p-2">Market</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.itemName}</td>
                <td className="p-2">৳{p.pricePerUnit}</td>
                <td className="p-2">{p.marketName}</td>
                <td className="p-2">{p.date}</td>
                <td className="p-2 capitalize">{p.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => navigate(`/dashboard/update-product/${p._id}`)}
                  >
                    ✏️ Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(p._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
