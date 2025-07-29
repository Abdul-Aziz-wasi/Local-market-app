import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios.get('https://local-market-omega.vercel.app/all-products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to load products');
      });
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`https://local-market-omega.vercel.app/product/${id}`, { status: 'approved' });
      toast.success('Product approved');
      refresh();
    } catch {
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`https://local-market-omega.vercel.app/product/${id}`, { status: 'rejected' });
      toast.warn('Product rejected');
      refresh();
    } catch {
      toast.error('Failed to reject');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://local-market-omega.vercel.app/products/${deleteId}`);
      toast.success('Product deleted');
      setDeleteId(null);
      refresh();
    } catch {
      toast.error('Delete failed');
    }
  };

  const refresh = async () => {
    const res = await axios.get('https://local-market-omega.vercel.app/all-products');
    setProducts(res.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📋 All Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Market</th>
              <th>Status</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.productName}</td>
                <td>{p.marketName}</td>
                <td className="capitalize">{p.status}</td>
                <td>{p.vendor}</td>
                <td className="space-x-2">
                  {p.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(p._id)} className="btn btn-xs btn-success">Approve</button>
                      <button onClick={() => handleReject(p._id)} className="btn btn-xs btn-warning">Reject</button>
                    </>
                  )}
                  <Link to={`/dashboard/update-product/${p._id}`} className="btn btn-xs btn-info">Update</Link>
                  <button onClick={() => setDeleteId(p._id)} className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold text-red-600">Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleDelete} className="btn btn-error">Yes, Delete</button>
              <button onClick={() => setDeleteId(null)} className="btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
