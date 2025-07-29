import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllAdvertisements = () => {
  const [ads, setAds] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios.get('https://local-market-omega.vercel.app/advertisements')
      .then(res => setAds(res.data))
      .catch(() => toast.error("Failed to load advertisements"));
  }, []);

  const refresh = async () => {
    const res = await axios.get('https://local-market-omega.vercel.app/advertisements');
    setAds(res.data);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://local-market-omega.vercel.app/advertisements/${id}`, { status: newStatus });
      toast.success(`Ad marked as ${newStatus}`);
      refresh();
    } catch {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://local-market-omega.vercel.app/advertisements/${deleteId}`);
      toast.success("Advertisement deleted");
      setDeleteId(null);
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📢 All Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad._id}>
                <td>{ad.title || 'Untitled'}</td>
                <td>{ad.vendorEmail}</td>
                <td className="capitalize">{ad.status}</td>
                <td className="space-x-2">
                  <button onClick={() => handleStatusChange(ad._id, 'approved')} className="btn btn-xs btn-success">Approve</button>
                  <button onClick={() => handleStatusChange(ad._id, 'rejected')} className="btn btn-xs btn-warning">Reject</button>
                </td>
                <td>
                  <button onClick={() => setDeleteId(ad._id)} className="btn btn-xs btn-error">Delete</button>
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
            <p>Are you sure you want to delete this ad?</p>
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

export default AllAdvertisements;
