import React from 'react';
import HotelCard from './HotelCard';
import { useQuery } from '@tanstack/react-query';

const fetchHotelImage = async (hotelName) => {
  if (!hotelName) return '/travel-plane.jpg';

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${hotelName}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
    );

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error(`Error fetching image for ${hotelName}:`, error);
  }

  return '/travel-plane.jpg';
};

const Hotels = ({ trip }) => {
  const hotels = trip?.tripData?.tripDetails?.Hotels || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => {
            const { data: imageUrl = '/travel-plane.jpg' } = useQuery({
              queryKey: ['hotelImage', hotel.HotelName],
              queryFn: () => fetchHotelImage(hotel.HotelName),
              staleTime: 60 * 1000,
              enabled: !!hotel.HotelName,
            });

            return (
              <HotelCard 
                key={index} 
                hotel={hotel} 
                imageUrl={imageUrl} 
              />
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">No hotels available.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
