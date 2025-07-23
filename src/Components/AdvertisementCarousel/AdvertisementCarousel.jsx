import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/advertisements')
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error('Failed to fetch ads:', err));
  }, []);

  if (!ads.length) {
    return <p className="text-center py-8 text-gray-500">No advertisements available</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <h2 className="text-2xl font-bold text-teal-700 text-center mb-4"> Advertisement Highlights</h2>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="rounded-lg shadow-lg overflow-hidden"
      >
        {ads.map((ad, index) => (
          <div key={index} className="relative">
            <img src={ad.image} alt={ad.title || `Ad ${index + 1}`} className="h-[300px] w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-teal-500 bg-opacity-60 text-white p-4 text-center">
              <h3 className="text-xl font-bold">{ad.title}</h3>
              <p className="text-sm">{ad.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdvertisementCarousel;
