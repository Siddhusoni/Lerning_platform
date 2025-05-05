import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAds = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ads');
        setAds(res.data);
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      }
    };

    fetchAds();
  }, []);

  // Auto slide every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [ads.length]);

  if (!ads.length) return null;

  return (
    <div className="w-full h-[200px] sm:h-[350px] md:h-[450px] relative overflow-hidden">
      {ads.map((ad, index) => (
        <div
          key={ad.id}
          className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={ad.image_url}
            alt={ad.title}
            className="w-full object-cover h-auto"
          />
          <div className="absolute inset-0 bg-black  bg-opacity-50 flex flex-col justify-center items-center text-center px-4 text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{ad.title}</h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg max-w-2xl">{ad.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserAds;
