import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@tanstack/react-router';

const TripCardItem = ({ trip }) => {
  const [tripImage, setTripImage] = useState('/travel-plane.jpg');

  useEffect(() => {
    const fetchTripImage = async () => {
      try {
        const destination = trip?.tripData?.destination;
        if (!destination) return;

        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: destination,
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
            per_page: 1
          }
        });

        if (response.data.results.length > 0) {
          setTripImage(response.data.results[0].urls.regular);
        }
      } catch (error) {
        console.error('Error fetching trip image:', error);
        setTripImage('/travel-plane.jpg');
      }
    };

    fetchTripImage();
  }, [trip?.tripData?.destination]);

  return (
    <Link to={`/ViewTrip/${trip?.id}`}>
    <div className='hover:scale-105 transition-all'>
      <img 
        src={tripImage} 
        alt={trip?.tripData?.destination}
        className='object-cover rounded-xl h-48 w-full'
      />
      <div>
        <h2 className='font-bold text-lg'>{trip?.tripData?.destination}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.tripData?.days} Days trip {trip?.tripData?.budget}</h2>
      </div>
    </div>
    </Link>
  );
};

export default TripCardItem;