import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data by ID
  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  // Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      itemName: form.itemName.value,
      pricePerUnit: parseFloat(form.pricePerUnit.value),
      marketName: form.marketName.value,
      date: form.date.value,
      marketDescription: form.marketDescription.value,
      productImage: form.productImage.value
    };

    try {
      await axios.put(`http://localhost:3000/product/${id}`, updatedProduct);
      toast.success('Product updated successfully');
      navigate('/dashboard/my-products');
    } catch (error) {
      toast.error('Failed to update product');
      console.error(error);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4 text-red-600">Product not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">✏️ Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input defaultValue={product.itemName} placeholder="itemName" name="itemName" className="input" required />
        <input defaultValue={product.pricePerUnit} placeholder="pricePerUnit" name="pricePerUnit" className="input" required />
        <input defaultValue={product.marketName} placeholder="marketName" name="marketName" className="input" required />
        <input defaultValue={product.date} placeholder="date" name="date" className="input" required />
        <input defaultValue={product.marketDescription} placeholder="marketDescription" name="marketDescription" className="input" />
        <input defaultValue={product.productImage} placeholder="productImage"  name="productImage" className="input" /><br />

        <button type="submit" className="bg-teal-600  text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
