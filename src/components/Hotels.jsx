import React from 'react';
import { Link } from '@tanstack/react-router';

const Hotels = ({ trip }) => {
  return (
    <>
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.tripDetails?.Hotels?.length > 0 ? (
          trip?.tripData?.tripDetails?.Hotels?.map((hotel, index) => (

            <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelAddress}`} target='_blank'>
            <div key={index} className='hover:scale-110 transition-all cursor-pointer'>
              <img src='/travel-plane.jpg' className='rounded-xl'/>
              <div className='my-2'>
                <h2 className='font-medium'>{hotel?.HotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍{hotel?.HotelAddress}</h2>
                <h2 className='text-sm'>💰{hotel?.Price}</h2>
                <h2 className='text-sm'>⭐{hotel?.Rating}</h2>
              </div>   
            </div>
            </Link>

          ))
        ) : (
          <p>No hotels available.</p>
        )}
      </div>
    </>
  );
};

export default Hotels;
