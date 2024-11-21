import React from 'react';
import { Link } from '@tanstack/react-router';

const HotelCard = ({ hotel, imageUrl }) => (
  <Link 
    to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelAddress}`} 
    target='_blank'
    className='block'
  >
    <div className='hover:scale-105 transition-all cursor-pointer bg-white rounded-xl shadow-md overflow-hidden'>
      <img 
        src={imageUrl || '/travel-plane.jpg'} 
        alt={hotel.HotelName}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='font-semibold text-lg mb-1'>{hotel.HotelName}</h3>
        <div className='space-y-1'>
          <p className='text-sm text-gray-600 flex items-center'>
            <span className='mr-2'>📍</span>
            {hotel.HotelAddress}
          </p>
          <p className='text-sm flex items-center'>
            <span className='mr-2'>💰</span>
            {hotel.Price}
          </p>
          <p className='text-sm flex items-center'>
            <span className='mr-2'>⭐</span>
            {hotel.Rating}
          </p>
        </div>
      </div>
    </div>
  </Link>
);
export default HotelCard;