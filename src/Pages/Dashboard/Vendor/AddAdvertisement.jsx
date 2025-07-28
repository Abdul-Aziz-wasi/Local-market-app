import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';


const AddAdvertisement = () => {
  const { user } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newAd = {
      title: form.title.value,
      description: form.description.value,
      image: form.image.value,
      vendorEmail: user?.email || '', 
      status: 'pending',             
      createdAt: new Date()
    };
    console.log(newAd)

    try {
      const res = await axios.post('http://localhost:3000/advertisements', newAd);
      if (res.data.insertedId) {
        toast.success('Advertisement submitted for review!');
        form.reset();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit advertisement');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📢 Add Advertisement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Ad Title"
          required
          className="input w-full"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          required
          className="input w-full"
        />
        <input
          name="image"
          placeholder="Image URL"
          required
          className="input w-full"
        />

        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
          Submit Advertisement
        </button>
      </form>
    </div>
  );
};

export default AddAdvertisement;
