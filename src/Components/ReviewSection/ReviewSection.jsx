import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ReviewSection = () => {
  const { user } = useContext(AuthContext);
  const { id: productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const review = {
      productId,
      userName: user.displayName,
      userEmail: user.email,
      rating,
      comment,
    };

    try {
      const res = await axios.post('https://local-market-omega.vercel.app/reviews', review);
      if (res.data.insertedId) {
        setComment('');
        setRating(0);
        fetchReviews(); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    const res = await axios.get(`https://local-market-omega.vercel.app/reviews/${productId}`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-8 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">💬 User Reviews</h2>

      {user && (
        <form onSubmit={handleReviewSubmit} className="mb-6 space-y-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar
                key={star}
                className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your comment (e.g., Too expensive lately)"
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Submit Review
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((rev, index) => (
            <li key={index} className="border-b pb-2">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-800">{rev.comment}</p>
              <p className="text-sm text-gray-500">
                — {rev.userName} ({rev.userEmail}) on {new Date(rev.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSection;
