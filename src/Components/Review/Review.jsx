import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Daily User",
    review:
      "This app makes tracking market prices so much easier. I can compare prices across dates and save money every week!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sharmin Akter",
    role: "Vendor",
    review:
      "As a vendor, I love how I can update my product prices daily and reach more customers directly through this platform.",
    rating: 4,
  },
  {
    id: 3,
    name: "Abdul Karim",
    role: "Admin",
    review:
      "Managing advertisements, orders, and products in one place has made my work effortless. A very useful app!",
    rating: 5,
  },
];

const Review = () => {
    return (
       <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
        >
          What People Say About <span className="text-green-600">MarketPulse</span>
        </motion.h2>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-2xl p-6 text-left"
            >
              {/* Rating */}
              <div className="flex mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 mb-4">"{review.review}"</p>

              {/* User Info */}
              <div className="mt-4">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default Review;