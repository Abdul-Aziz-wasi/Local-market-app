import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';


const MyAdvertisements = () => {
  const { user } = useContext(AuthContext);
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://local-market-omega.vercel.app/my-advertisements/${user.email}`)
        .then(res => setAds(res.data))
        .catch(() => toast.error('Failed to load ads'));
    }
  }, [user?.email]);

  useEffect(() => {
  console.log('User:', user); 
}, [user]);

useEffect(() => {
  console.log('Fetched ads:', ads); 
}, [ads]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAd = {
      title: form.title.value,
      description: form.description.value,
      vendorEmail: user.email,
      image: form.image.value,
    };

    try {
      await axios.put(`https://local-market-omega.vercel.app/advertisements/${selectedAd._id}`, updatedAd);
      toast.success('Ad updated');
      setShowEditModal(false);
      refreshAds();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://local-market-omega.vercel.app/advertisements/${selectedAd._id}`);
      toast.success('Ad deleted');
      setShowDeleteModal(false);
      refreshAds();
    } catch {
      toast.error('Delete failed');
    }
  };

  const refreshAds = async () => {
    try {
      const res = await axios.get(`https://local-market-omega.vercel.app/my-advertisements/${user.email}`);
      setAds(res.data);
    } catch {
      toast.error('Failed to refresh ads');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 My Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad._id}>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>{ad.status}</td>
                <td>
                  <button
                    onClick={() => { setSelectedAd(ad); setShowEditModal(true); }}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedAd(ad); setShowDeleteModal(true); }}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedAd && (
        <div className="modal fixed z-50 bg-black bg-opacity-50 inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Advertisement</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input name="title" defaultValue={selectedAd.title} className="input input-bordered w-full" required />
              <input name="description" defaultValue={selectedAd.description} className="input input-bordered w-full" required />
              <input name="image" defaultValue={selectedAd.image} className="input input-bordered w-full" required />
              <div className="flex justify-end space-x-2">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedAd && (
        <div className="modal fixed z-50 bg-black bg-opacity-50 inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-red-600">Confirm Delete</h3>
            <p>Are you sure you want to delete this ad?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleDelete} className="btn btn-error">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
