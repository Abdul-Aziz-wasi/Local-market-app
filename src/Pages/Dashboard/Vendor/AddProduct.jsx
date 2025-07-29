import React, { use,  useState } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../../contexts/AuthContext';

const AddProduct = () => {
  const { user } = use(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = async (data) => {
    const product = {
      vendorEmail: user.email,
      vendorName: user.displayName || 'Vendor',
      marketName: data.marketName,
      date: selectedDate.toISOString().split('T')[0],
      marketDescription: data.marketDescription,
      itemName: data.itemName,
      image: data.image,
      status: 'pending',
      pricePerUnit: parseFloat(data.pricePerUnit),
      prices: [
        {
          date: selectedDate.toISOString().split('T')[0],
          price: parseFloat(data.pricePerUnit),
        },
      ]
    };

    try {
      const res = await axios.post('https://local-market-omega.vercel.app/products', product);
      if (res.data.insertedId) {
        toast.success(' Product added successfully and pending approval!');
        reset();
      }
    } catch (error) {
      console.error('Failed to submit product:', error);
      toast.error(' Failed to submit product.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="w-full border p-2"
          type="text"
          value={user.email}
          disabled
        />
        <input
          className="w-full border p-2"
          type="text"
          value={user.displayName || 'Vendor'}
          disabled
        />
        <input
          {...register('marketName', { required: true })}
          placeholder="🏪 Market Name"
          className="w-full border p-2"
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-full border p-2"
        />
        <textarea
          {...register('marketDescription', { required: true })}
          placeholder="📝 Market Description"
          className="w-full border p-2"
        />
        <input
          {...register('itemName', { required: true })}
          placeholder="🥦 Item Name"
          className="w-full border p-2"
        />
        <input
          {...register('image', { required: true })}
          placeholder="🖼️ Image URL"
          className="w-full border p-2"
        />
        <input
          {...register('pricePerUnit', { required: true })}
          placeholder="💵 Price per Unit (৳)"
          className="w-full border p-2"
          type="number"
          step="0.01"
        />
        <button type="submit" className="btn bg-teal-600 text-white w-full">
           Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
